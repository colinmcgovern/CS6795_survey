"use client"; // This is a client component

import CardGame from "./components/cardGame";

import React, { useState, useEffect } from 'react';

const [phase, setPhase] = useState(0);

const longTermGameSeed = 0
const shortTermGameSeed = 1

// TODO every middle phase should have 60s limit
// Randomly have last three middle phases be in random order 

export default function Home() {
  return (
    <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
      {phase === 0 ? (
        <Welcome />
      ) : phase === 1 ? (
        <CardGame showCardsOnly={true} seed={longTermGameSeed} />
      ) : phase === 2 ? (
        <DemographicsSurvey />
      ) : phase === 3 ? (
        <CardGame seed={shortTermGameSeed} />
      ) : phase === 4 ? (
        <NostolgiaSurvey />
      ) : phase === 5 ? (
        <CardGame doNotShowCards={true} seed={longTermGameSeed} />
      ) : (
        <ThankYou />
      )}
    </div>
  );
}
