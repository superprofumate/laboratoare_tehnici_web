"use client"

import styles from './Xsi0.module.scss';
import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

export default function GameX0Layout() {
  const [tileBoard, setTileBoard] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ])
  const [input, setInput] = useState(""); // player choice
  const [turn, setTurn] = useState(1); // 1 - X, 0 - O
  const [player, setPlayer] = useState(null); // 1 - X, 0 - O
  const [endGame, setEndGame] = useState(null); // 1 - X, 0 - O, -1 - draw
  const [alertMessage, setAlertMessage] = useState({ display: false, message: "" });
  const [score, setScore] = useState({
    computer: 0,
    player: 0
  })

  const handleResetGame = () => {
    setTileBoard([
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ]);
    setInput("");
    setTurn(1);
    setPlayer(null);
    setEndGame(null);
    setAlertMessage({ display: false, message: "" });
  }

  const displayedValue = {
    0: "/lab6/snowflake_0.png",
    1: "/lab6/gift_X.png"
  }

  const handleSetTile = (row, col) => {
    if (endGame !== null)
      return;
    if (tileBoard[row][col] !== -1)
      return;

    setTileBoard(prev => {
      const next = prev.map(r => r.slice());
      next[row][col] = turn;
      return next;
    })
    setTurn((turn) => (turn === 1 ? 0 : 1));
  }

  const handleMoverComputer = () => {
    if (endGame !== null)
      return;
    if (player === null)
      return;

    let availablePos = []
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (tileBoard[i][j] === -1)
          availablePos.push({ row: i, col: j });
    if (availablePos.length === 0) return;

    const option = Math.floor(Math.random() * (availablePos.length));
    const { row, col } = availablePos[option];
    handleSetTile(row, col);
  }

  const handleEndGame = (status) => {
    setEndGame(status);
    if (status === -1)
      console.log("Este egal");
    else {
      console.log(`A castigat" ${status !== player ? "calculatorul" : "jucatorul"}`)
      setScore((prev) => {
        const playerWon = status === player;
        return {
          player: prev.player + (playerWon ? 1 : 0),
          computer: prev.computer + (playerWon ? 0 : 1),
        };
      });
    }
    return;
  }

  const checkWinner = (b) => {
    for (let i = 0; i < 3; i++) {
      const rowWin = b[i][0] !== -1 && b[i][0] === b[i][1] && b[i][0] === b[i][2];
      if (rowWin) return b[i][0];

      const colWin = b[0][i] !== -1 && b[0][i] === b[1][i] && b[0][i] === b[2][i];
      if (colWin) return b[0][i];
    }
    const diag1 = b[0][0] !== -1 && b[0][0] === b[1][1] && b[0][0] === b[2][2];
    if (diag1)
      return b[0][0];
    const diag2 = b[0][2] !== -1 && b[0][2] === b[1][1] && b[0][2] === b[2][0];
    if (diag2)
      return b[0][2];
    return null;
  };
  const checkDraw = (b) => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (b[i][j] === -1)
          return 0;

    return 1;
  }

  useEffect(() => {
    if (endGame !== null) return;

    const handleCheckEndGame = () => {
      const winner = checkWinner(tileBoard);
      const draw = checkDraw(tileBoard);
      if (winner !== null || draw) {
        const endGameStatus = winner !== null ? winner : -1; // = -1 -> draw ; != -1 -> winner
        handleEndGame(endGameStatus);
      }
    }

    handleCheckEndGame();
  }, [tileBoard, endGame]);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleSendInput = () => {
    const is0 = input === "o" || input === "O" || input === "0";
    const isX = input === "x" || input === "X";
    if (!is0 && !isX) {
      setInput("");
      setAlertMessage({
        display: true,
        message: "Invalid value! Only 'X', '0' permitted"
      });
      return;
    }

    setPlayer(isX ? 1 : 0);
  }

  useEffect(() => {
  const w = checkWinner(tileBoard);
  const d = checkDraw(tileBoard);
  if (w !== null || d) return;

  if (endGame !== null) return;
  if (player === null) return;
  if (turn !== player) handleMoverComputer();
}, [tileBoard, player, turn, endGame]);


  const handleExitAlert = () => {
    setAlertMessage({
      display: false,
      message: ""
    });
  }

  return (
    <div className={styles.main}>
      {
        alertMessage.display && (
          <div className={styles.alert} onClick={() => { handleExitAlert() }}>
            <div className={styles.alertContainer}>
              <span className='text text--title text--titleTertiary'>
                {alertMessage.message}
              </span>
            </div>
          </div>
        )
      }

      <div className={styles.controlPanel}>
        {
          player === null ? (
            <>
              <span className='text text--title text--titleTertiary'>
                Hello, what do you want to play with, X or O ?
              </span>
              <input type="text" value={input} onChange={(e) => handleInput(e)} disabled={player !== null} className={styles.input} />
              <button onClick={() => handleSendInput()} disabled={player !== null} className={styles.button}>
                <IoIosArrowForward size={20} onClick={() => handleSendInput()} disabled={player !== null} className={styles.icon} />
              </button>
            </>
          ) : (
            <>
              <span className='text text--title text--titleTertiary'>
                {
                  endGame === null ? (
                    'Jocul a inceput !'
                  ) : (
                    endGame === -1 ? (
                      "It's a draw"
                    ) : (
                      `${endGame === player ? 'Player' : 'Computer'} won this round`
                    )
                  )
                }
              </span>
              {
                endGame !== null &&
                <RotateCcw size={30} onClick={() => { handleResetGame(); }} />
              }
            </>
          )
        }
      </div>

      <div className={styles.mainRow}>
        {
          player !== null && endGame === null && (
            <div className={styles.leftInfoTable}>
              <div className={styles.lateralDisplay}>
                <h2 className='text text--title text--titleTertiary'> {player === 1 ? 'player - X' : 'computer - X'}</h2>
                <Image src={displayedValue[1]} width={100} height={100} alt={"x - gift"} style={{ background: "none" }} />
              </div>
              <div className={styles.lateralDisplay}>
                <h2 className='text text--title text--titleTertiary'> {player === 0 ? 'player - O' : 'computer - O'}</h2>
                <Image src={displayedValue[0]} width={100} height={100} alt={"x - gift"} style={{ background: "none" }} />
              </div>
            </div>
          )
        }

        <div className={styles.board} style={{ opacity: endGame === null && player !== null ? 1 : 0.7 }}>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const value = tileBoard[row][col];

              return (
                <button key={i} className={styles.tile} onClick={() => { turn === player && handleSetTile(row, col); }} disabled={player === null}>
                  {
                    value === -1 ? (
                      ""
                    ) : (
                      <Image src={displayedValue[value]} width={100} height={100} alt={"x - gift"} style={{ background: "none" }} />
                    )
                  }
                </button>
              );
            })
          }
        </div>

        {
          player !== null && endGame === null && (
            <div className={styles.lateralDisplay}>
              <h2 className='text text--title text--titleTertiary'> computer - {score.computer}</h2>
              <h2 className='text text--title text--titleTertiary'> player - {score.player}</h2>
            </div>
          )
        }
      </div>
    </div>
  );
}