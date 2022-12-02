import { input } from "./input";

type PlayerSymbol = "X" | "Y" | "Z";
type OpponentSymbol = "A" | "B" | "C";
type GameChoice = "Rock" | "Paper" | "Scissors";

const playerMappings: { symbol: PlayerSymbol; choice: GameChoice }[] = [
  { symbol: "X", choice: "Rock" },
  { symbol: "Y", choice: "Paper" },
  { symbol: "Z", choice: "Scissors" },
];

const opponentMappings: { symbol: OpponentSymbol; choice: GameChoice }[] = [
  { symbol: "A", choice: "Rock" },
  { symbol: "B", choice: "Paper" },
  { symbol: "C", choice: "Scissors" },
];

const choicePointMappings: { choice: GameChoice; points: number }[] = [
  { choice: "Rock", points: 1 },
  { choice: "Paper", points: 2 },
  { choice: "Scissors", points: 3 },
];

const rounds: string[] = input.split("\n");

const roundScores: number[] = rounds.map((x) => {
  const [opponentSynmbol, playerSymbol] = x.split(" ");

  const playerChoice = playerMappings.find((x) => x.symbol === playerSymbol)?.choice;
  const opponentChoice = opponentMappings.find((x) => x.symbol === opponentSynmbol)?.choice;

  const playerHasWon =
    (playerChoice === "Rock" && opponentChoice === "Scissors") ||
    (playerChoice === "Paper" && opponentChoice === "Rock") ||
    (playerChoice === "Scissors" && opponentChoice === "Paper");

  const isDraw = playerChoice === opponentChoice;

  const outcomePoints: number = playerHasWon ? 6 : isDraw ? 3 : 0;
  const choicePoints: number = choicePointMappings.find((x) => x.choice === playerChoice)?.points ?? 0;

  return outcomePoints + choicePoints;
});

const totalScore = roundScores.reduce((a, b) => a + b, 0);

console.log(totalScore)
