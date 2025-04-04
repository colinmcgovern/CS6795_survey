import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { sendDataToLog } from '../sendDataToLog.js';

export default function MemoryChallengeGame({ setPhase, nickname }){

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const [hasStarted, setHasStarted] = useState(false);

    const decades = ["70", "80", "90", "00", "10"];
    const devices = ["vg", "phone", "car", "computer"];

    const [shownImages, setShownImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isShowingImages, setIsShowingImages] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameOver, setIsGameOver] = useState(false);
    const [questionImage, setQuestionImage] = useState(null);

    useEffect(() => {
        const selectedImages = shuffleArray(decades.flatMap((decade) => {
            return devices.map((device) => ({
                id: `${decade}${device}`,
                image: `/cards/${decade}_${device}.png`,
            }));
        })).slice(10);
        setShownImages(selectedImages);
        console.log("Called")
    }, []);

    useEffect(() => {
        if (hasStarted && isShowingImages && shownImages.length > 0) {
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
    }, [hasStarted, isShowingImages, currentImageIndex, shownImages]);

    useEffect(() => {
        let timer;
        if (hasStarted && !isShowingImages && !isGameOver) {
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
    }, [hasStarted, isShowingImages, isGameOver]);

    let answerCount = 0

    const [isCorrectMessage, setIsCorrectMessage] = useState(false);

    const handleAnswer = (answer) => {
        if (isGameOver) return;

        const isCorrect = shownImages.some((img) => img.id === questionImage.id) === answer;
        
        if(isCorrect){
            setIsCorrectMessage("Correct!");
        }else{
            setIsCorrectMessage("Incorrect!");
        }

        setTimeout(() => {
            setIsCorrectMessage("");    
        }, 1000);

        sendDataToLog(nickname, "flash_memory", {
            image: questionImage.image,
            shown: shownImages.some((img) => img.id === questionImage.id),
            answer,
            correct: isCorrect,
        })

        setQuestionImage(shuffleArray(decades.flatMap((decade) => {
            return devices.map((device) => ({
                id: `${decade}${device}`,
                image: `/cards/${decade}_${device}.png`,
            }));
        }))[Math.floor(Math.random() * 20)]);

        answerCount += 1

        // if(answerCount % 3 === 0){
        //     setIsShowingImages(true);
        // }
    };

    return (
        <div className="memory-challenge-game">
            {!hasStarted ? (
                <div className="start-screen">
                    <h1>Memory Challenge Game (Part 3 of 6)</h1>
                    <h2>Are you ready to test your memory? You will be shown 10 images. Please remember them to the best of your ability.</h2>
                    <button
                        style={{
                            padding: '15px 30px',
                            fontSize: '18px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setHasStarted(true)}
                    >
                        Start
                    </button>
                </div>
            ) : (
                <>
                    <h1>Memory Challenge Game (Part 3 of 6)</h1>
                    <h2>Remember the images and answer the questions!</h2>
                    <div>Time Left: {timeLeft}s</div>
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
                            <>
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
                                {isCorrectMessage && (
                                    <div style={{ marginTop: '20px', fontSize: '18px', color: isCorrectMessage === "Correct!" ? 'green' : 'red' }}>
                                        {isCorrectMessage}
                                    </div>
                                )}
                            </>
                        </div>
                    )}
                    {isGameOver && (
                        <div className="game-over">
                            <h2>Good Job!</h2>
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
                </>
            )}
        </div>
    );
};