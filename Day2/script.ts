import { input } from "./input";

type PlayerSymbol = "X" | "Y" | "Z";
type OpponentSymbol = "A" | "B" | "C";
type GameChoice = "Rock" | "Paper" | "Scissors";

const choiceMappings: {
  playerSymbol: PlayerSymbol;
  opponentSymbol: OpponentSymbol;
  choice: GameChoice;
  points: number;
}[] = [
  { playerSymbol: "X", opponentSymbol: "A", choice: "Rock", points: 1 },
  { playerSymbol: "Y", opponentSymbol: "B", choice: "Paper", points: 2 },
  { playerSymbol: "Z", opponentSymbol: "C", choice: "Scissors", points: 3 },
];

const outcomeMappings: { opponentChoice: GameChoice; win: GameChoice; draw: GameChoice; lose: GameChoice }[] = [
  { opponentChoice: "Rock", win: "Paper", draw: "Rock", lose: "Scissors" },
  { opponentChoice: "Paper", win: "Scissors", draw: "Paper", lose: "Rock" },
  { opponentChoice: "Scissors", win: "Rock", draw: "Scissors", lose: "Paper" },
];

const rounds: string[] = input.split("\n");

const roundScores: number[] = rounds.map((x) => {
  const [opponentSymbol, playerSymbol] = x.split(" ");

  const playerChoice = choiceMappings.find((x) => x.playerSymbol === playerSymbol)?.choice;
  const opponentChoice = choiceMappings.find((x) => x.opponentSymbol === opponentSymbol)?.choice;

  const playerHasWon =
    (playerChoice === "Rock" && opponentChoice === "Scissors") ||
    (playerChoice === "Paper" && opponentChoice === "Rock") ||
    (playerChoice === "Scissors" && opponentChoice === "Paper");

  const isDraw = playerChoice === opponentChoice;

  const outcomePoints: number = playerHasWon ? 6 : isDraw ? 3 : 0;
  const choicePoints: number = choiceMappings.find((x) => x.choice === playerChoice)?.points ?? 0;

  return outcomePoints + choicePoints;
});

const totalScore = roundScores.reduce((a, b) => a + b, 0);
//console.log(totalScore);

const roundScoresPart2: number[] = rounds.map((x) => {
  const [opponentSymbol, outcomeSymbol] = x.split(" ");

  const opponentChoice = choiceMappings.find((x) => x.opponentSymbol === opponentSymbol)?.choice;

  let outcomePoints: number;
  if (outcomeSymbol === "Z") {
    outcomePoints = 6;
  }
  else if (outcomeSymbol === "Y") {
    outcomePoints = 3;
  }
  else  {
    outcomePoints = 0;
  }

  let choicePoints: number;
  if (outcomeSymbol === "Z") {
    const winningPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.win;
    choicePoints = choiceMappings.find((x) => x.choice === winningPlayerChoice)?.points ?? 0;
  } else if (outcomeSymbol === "Y") {
    const drawingPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.draw;
    choicePoints = choiceMappings.find((x) => x.choice === drawingPlayerChoice)?.points ?? 0;
  } else {
    const losingPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.lose;
    choicePoints = choiceMappings.find((x) => x.choice === losingPlayerChoice)?.points ?? 0;
  }

  return outcomePoints + choicePoints;
});

const totalScore2 = roundScoresPart2.reduce((a, b) => a + b, 0);
console.log(totalScore2);
