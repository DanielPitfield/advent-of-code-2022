export type PlayerSymbol = "X" | "Y" | "Z";
export type OpponentSymbol = "A" | "B" | "C";
export type GameChoice = "Rock" | "Paper" | "Scissors";

export const choiceMappings: {
  playerSymbol: PlayerSymbol;
  opponentSymbol: OpponentSymbol;
  choice: GameChoice;
  points: number;
}[] = [
  { playerSymbol: "X", opponentSymbol: "A", choice: "Rock", points: 1 },
  { playerSymbol: "Y", opponentSymbol: "B", choice: "Paper", points: 2 },
  { playerSymbol: "Z", opponentSymbol: "C", choice: "Scissors", points: 3 },
];

export const outcomeMappings: { opponentChoice: GameChoice; win: GameChoice; draw: GameChoice; lose: GameChoice }[] = [
  { opponentChoice: "Rock", win: "Paper", draw: "Rock", lose: "Scissors" },
  { opponentChoice: "Paper", win: "Scissors", draw: "Paper", lose: "Rock" },
  { opponentChoice: "Scissors", win: "Rock", draw: "Scissors", lose: "Paper" },
];
