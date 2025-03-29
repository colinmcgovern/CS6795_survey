
import React, { useState } from 'react';
import { sendDataToLog } from '../sendDataToLog.js';

const DemographicsQuiz = ({setPhase, nickname}) => {

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        ethnicity: '',
        politicalParty: '',
        educationLevel: '',
        maritalStatus: '',
        children: '',
        country: '',
        state: '',
        gamingFrequency: '',
        futureOutlook: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h1>Who are you? (Part 4 of 6)</h1>
            <form>
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                handleChange(e);
                            }
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="ethnicity">Ethnicity:</label>
                    <select
                        id="ethnicity"
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="asian">Asian</option>
                        <option value="hispanic">Hispanic</option>
                        <option value="middle-eastern">Middle Eastern</option>
                        <option value="pacific-islander">Pacific Islander</option>
                        <option value="native-american">Native American</option>
                        <option value="mixed">Mixed</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="politicalParty">Political Party:</label>
                    <select
                        id="politicalParty"
                        name="politicalParty"
                        value={formData.politicalParty || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="democrat">Democrat</option>
                        <option value="republican">Republican</option>
                        <option value="green-party">Green Party</option>
                        <option value="libertarian">Libertarian</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="educationLevel">Education Level:</label>
                    <select
                        id="educationLevel"
                        name="educationLevel"
                        value={formData.educationLevel || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="no-high-school">No High School</option>
                        <option value="high-school">High School</option>
                        <option value="bs">Bachelor's Degree</option>
                        <option value="advanced-degree">Advanced Degree</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="maritalStatus">Are you married?</label>
                    <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="children">How many children do you have?</label>
                    <input
                        type="number"
                        id="children"
                        name="children"
                        value={formData.children || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                handleChange(e);
                            }
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="state">State/Province:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="gamingFrequency">How often do you play video games?</label>
                    <select
                        id="gamingFrequency"
                        name="gamingFrequency"
                        value={formData.gamingFrequency || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="every-day">Every day</option>
                        <option value="every-week">Every week</option>
                        <option value="every-month">Every month</option>
                        <option value="every-year">Every year</option>
                        <option value="never">Never</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <label htmlFor="futureOutlook">What is your outlook on the future?</label>
                    <select
                        id="futureOutlook"
                        name="futureOutlook"
                        value={formData.futureOutlook || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="very-bad">Very Bad</option>
                        <option value="bad">Bad</option>
                        <option value="neutral">Neutral</option>
                        <option value="good">Good</option>
                        <option value="very-good">Very Good</option>
                    </select>
                </div>


                {
                    Object.values(formData).every((value) => value !== '') &&    
                (<button
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
                        setPhase((prevPhase) => prevPhase + 1);
                    }}
                >
                    Next
                </button>)
                }
            </form>
        </div>
    );
};

export default DemographicsQuiz;