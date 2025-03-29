import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { sendDataToLog } from '../sendDataToLog.js';

const decades = ["70", "80", "90", "00", "10"];
const devices = ["vg", "phone", "car", "computer"];

const CardGame = ({ setPhase, nickname, rows = 5, cols = 6 }) => {
    let initialCards = decades.flatMap((decade) => {
        return devices.map((device) => {
            return { id: `${decade}${device}`, value: `${decade}_${device}`, image: `/cards/${decade}_${device}.png`, isFlipped: true, isMatched: false };
        });
    });
    initialCards = shuffleArray(initialCards).slice(0, rows * cols / 2);
    initialCards = initialCards.concat(
        initialCards.map(card => ({
            ...card,
            id: `${card.id}_duplicate`
        }))
    );

    const [cards, setCards] = useState(initialCards);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCount, setMatchedCount] = useState(0);
    const [hasShuffled, setHasShuffled] = useState(false);
    const [isStartPressed, setIsStartPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // Timer state
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (hasShuffled) return;
        setCards(shuffleArray(cards));
        setHasShuffled(true);
    }, [hasShuffled]);

    useEffect(() => {
        if (isStartPressed) {
            setCards(cards.map(card => ({ ...card, isFlipped: false, isMatched: false })));
            console.log("Game started");
        }
    }, [isStartPressed]);

    useEffect(() => {
        let timer;
        if (isStartPressed && !isGameOver) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsGameOver(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStartPressed, isGameOver]);

    useEffect(() => {
        if (matchedCount === cards.length) {
            setIsGameOver(true);
        }
    }, [matchedCount, cards.length]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleCardClick = (index) => {
        if (cards[index].isFlipped || flippedCards.length === 2 || isGameOver) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstIndex, secondIndex] = newFlippedCards;

            sendDataToLog(
                nickname,
                "pair of cards",
                cards[firstIndex].id + " " + cards[secondIndex].id
            );

            if (newCards[firstIndex].value === newCards[secondIndex].value) {
                newCards[firstIndex].isMatched = true;
                newCards[secondIndex].isMatched = true;
                setMatchedCount(matchedCount + 2);
            } else {
                setTimeout(() => {
                    newCards[firstIndex].isFlipped = false;
                    newCards[secondIndex].isFlipped = false;
                    setCards([...newCards]);
                }, 1000);
            }
            setFlippedCards([]);
        }
    };

    return (
        <div className="card-game">
            <h1>Matching Card Game (Part 2 of 6)</h1>
            <h2>Try your best to memorize the cards. Wrong guesses are slightly penalized.</h2>
            <div>Time Left: {timeLeft}s</div>
            <div
                className="cards-container"
                style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: '10px',
                }}
            >
                {hasShuffled && cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                        onClick={() => {
                            handleCardClick(index);
                            setIsStartPressed(true);
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            height: '128px',
                            width: '128px',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {(card.isFlipped || card.isMatched) ? (
                            <Image
                                src={card.image}
                                alt={`Card ${card.value}`}
                                layout="fill"
                                objectFit="contain"
                            />
                        ) : (
                            <span style={{ fontSize: '24px' }}>?</span>
                        )}
                    </div>
                ))}
            </div>
            {isGameOver && (
                <div className="game-over">
                    <h2>{matchedCount === cards.length ? "Congratulations! You matched all the cards! Click Next." : "Time's up! Game over! Click Next."}</h2>
                    <button style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }} onClick={() => {setPhase(prevPhase => prevPhase + 1)}}>Next</button>
                </div>
            )}
        </div>
    );
};

export default CardGame;
