"use client"; // This is a client component

import Welcome from "./components/Welcome";
import CardGame from "./components/cardGame";
import MemorizeGame from "./components/memorizeGame";
import DemographicsQuiz from "./components/DemographicsQuiz";
import NastQuiz from "./components/NastQuiz";
import ThankYou from "./components/ThankYou";

import React, { useState, useEffect } from 'react';

// TODO every middle phase should have 60s limit
// Randomly have last three middle phases be in random order 

export default function Home() {

  const [phase, setPhase] = useState(0);
  const [nickname, setNickname] = useState('');

  return (
    <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
      {phase === 0 ? (
        <Welcome setPhase={setPhase} nickname={nickname} setNickname={setNickname} />
      ) : phase === 1 ? (
        <CardGame setPhase={setPhase} nickname={nickname}/>
      ) : phase === 2 ? (
        <MemorizeGame setPhase={setPhase} nickname={nickname}/>
      ) : phase === 3 ? (
        <DemographicsQuiz setPhase={setPhase} nickname={nickname}/>
      ) : phase === 4 ? (
        <NastQuiz setPhase={setPhase} nickname={nickname}/>
      ) : (
        <ThankYou nickname={nickname}/>
      )}
    </div>
  );
}
