import React, { useState } from 'react';
import { sendDataToLog } from '../sendDataToLog.js';

const NostalgiaQuiz = ({ setPhase, nickname }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const items = [
        "How often do you experience nostalgia?",
        "How prone are you to feeling nostalgic?",
        "Generally speaking‚ how often do you bring to mind nostalgic experiences?",
        "Specifically‚ how often do you bring to mind nostalgic experiences?",
        "How important is it for you to bring to mind nostalgic experiences?",
    ];

    return (
        <div>
            <h2>How Nostalgic Are You? (Part 5 of 6)</h2>
            <h3>
                1 is very rarely and 7 is very frequently. The next button will appear after you answer all questions.
            </h3>
            <br/>
            <form>
                {items.map((item, index) => (
                    <div key={index}>
                        <label>{index + 1}. {item}</label>
                        <div style={{ display: 'flex', gap: '64px', marginTop: '5px' }}>
                            {Array.from({ length: 7 }, (_, i) => i + 1).map((value) => (
                                <label key={value}>
                                    <input
                                        type="radio"
                                        name={`item-${index}`}
                                        value={value}
                                        checked={formData[`item-${index}`] === String(value)}
                                        onChange={handleChange}
                                        required
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                        <br/>
                    </div>
                ))}
                {Object.keys(formData).length === items.length && (
                    <button
                        type="button"
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
                        onClick={() => {
                            sendDataToLog(nickname, "formData", formData);
                            setPhase(prevPhase => prevPhase + 1);
                        }}
                    >
                        Next
                    </button>
                )}
            </form>
        </div>
    );
};

export default NostalgiaQuiz;
