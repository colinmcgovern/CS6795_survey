import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { sendDataToLog } from '../sendDataToLog.js';



export default function MemoryChallengeGame({ setPhase, nickname }){

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const decades = ["70", "80", "90", "00", "10"];
const devices = ["vg", "phone", "car", "computer"];

    const [shownImages, setShownImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isShowingImages, setIsShowingImages] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [questionImage, setQuestionImage] = useState(null);

    useEffect(() => {
        const selectedImages = shuffleArray(decades.flatMap((decade) => {
            return devices.map((device) => ({
                id: `${decade}${device}`,
                image: `/cards/${decade}_${device}.png`,
            }));
        // })).slice(0, Math.floor(Math.random() * 6) + 5); // Randomly select 5-10 images
    })).slice(0, 1); // Randomly select 5-10 images
        setShownImages(selectedImages);
    }, [isShowingImages]);

    useEffect(() => {
        if (isShowingImages && shownImages.length > 0) {
            const interval = setInterval(() => {
                if (currentImageIndex < shownImages.length) {
                    setCurrentImageIndex((prevIndex) => prevIndex + 1);
                } else {
                    setIsShowingImages(false);
                    setQuestionImage(shownImages[Math.floor(Math.random() * shownImages.length)]);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isShowingImages, currentImageIndex, shownImages]);

    useEffect(() => {
        let timer;
        if (!isShowingImages && !isGameOver) {
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
    }, [isShowingImages, isGameOver]);

    let answerCount = 0

    const handleAnswer = (answer) => {
        if (isGameOver) return;

        const isCorrect = shownImages.some((img) => img.id === questionImage.id) === answer;
        setScore((prevScore) => prevScore + (isCorrect ? 1 : -1));

        

        setQuestionImage(shuffleArray(decades.flatMap((decade) => {
            return devices.map((device) => ({
                id: `${decade}${device}`,
                image: `/cards/${decade}_${device}.png`,
            }));
        }))[Math.floor(Math.random() * 20)]);

        answerCount += 1

        if(answerCount % 3 === 0){
            setIsShowingImages(true);
        }
    };

    return (
        <div className="memory-challenge-game">
            <h1>Memory Challenge Game</h1>
            <h2>Remember the images and answer the questions!</h2>
            <div>Time Left: {timeLeft}s</div>
            <div>Score: {score}</div>
            {isShowingImages ? (
                <div className="image-display">
                    {currentImageIndex < shownImages.length && (
                        <Image
                            src={shownImages[currentImageIndex].image}
                            alt="Memory Image"
                            width={400}
                            height={400}
                        />
                    )}
                </div>
            ) : (
                <div className="question-section">
                    <h3>Was this image shown before?</h3>
                    {questionImage && (
                        <Image
                            src={questionImage.image}
                            alt="Question Image"
                            width={400}
                            height={400}
                        />
                    )}
                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        <button
                            style={{
                                padding: '15px 30px',
                                fontSize: '18px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleAnswer(true)}
                        >
                            Yes
                        </button>
                        <button
                            style={{
                                padding: '15px 30px',
                                fontSize: '18px',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleAnswer(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            {isGameOver && (
                <div className="game-over">
                    <h2>Game Over! Your score: {score}</h2>
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                        onClick={() => setPhase((prevPhase) => prevPhase + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};