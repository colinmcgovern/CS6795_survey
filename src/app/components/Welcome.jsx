import { sendDataToLog } from '../sendDataToLog.js';

export default function Welcome({ setPhase, nickname, setNickname }) {

    const handleInputChange = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to my test (Part 1 of 6)</h1>
            <p>This test will take about 5 minutes to complete.</p>
            <p>First, we need to know who you are.</p>
            <p>Please enter a nickname for yourself:</p>
            <input
                type="text"
                value={nickname}
                onChange={handleInputChange}
                placeholder="Enter your nickname"
                style={{ padding: '10px', fontSize: '16px' }}
            />
            { nickname && <p>Your nickname: {nickname}</p> }

            { nickname &&
                <button
                    onClick={() => {
                        const currentTime = Math.floor(Date.now() / 1000);
                        setNickname(nickname + "_" + currentTime);
                        sendDataToLog(
                            nickname + "_" + currentTime,
                            "nickname",
                            nickname + "_" + currentTime
                        );
                        setPhase(1);
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
                    Next
                </button>
            }   
        </div>
    );
};

