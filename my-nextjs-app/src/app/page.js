"use client"; // This is a client component

import Image from "next/image";
import styles from "./page.module.css";

import CardGame from "./components/cardGame";

export default function Home() {
  return (
    <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
      <CardGame />
    </div>
  );
}
