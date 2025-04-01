import { sendDataToLog } from '../sendDataToLog.js';
import { useState } from 'react';

export default function ThankYou(nickname) {

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to my test (Part 6 of 6)</h1>
            <p>Thank you so much for participating in my survey.</p>

            <br/>
            <p>If you are interested in reading the paper from the analysis of this survey. Please enter your email below.</p>
            { isSubmitted === false &&
            <>
            
            <inputNext
                type="text"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                style={{ padding: '10px', fontSize: '16px' }}
            />

                <button
                    onClick={() => {
                        sendDataToLog(
                            nickname,
                            "email",
                            email
                        );
                        setIsSubmitted(true);
                    }}
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
                >
                    Submit
                </button>
                </>
            } 
        </div>
    );
};

