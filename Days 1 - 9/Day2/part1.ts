import { input } from "./input";
import { GameChoice, choiceMappings, PlayerSymbol, OpponentSymbol } from "./mappings";

// How many points do you get for a game choice (regardless of the outcome?)
function getChoicePoints(choice: GameChoice) {
  return choiceMappings.find((x) => x.choice === choice)?.points ?? 0;
}

// How many points do you get for each round outcome?
function getOutcomePoints(playerHasWon: boolean, isDraw: boolean) {
  if (playerHasWon) {
    return 6;
  }

  if (isDraw) {
    return 3;
  }

  return 0;
}

// How many total points for the round?
function getRoundScore(playerSymbol: PlayerSymbol, opponentSymbol: OpponentSymbol) {
  // Convert to the choices (instead of symbols) for better readability
  const playerChoice: GameChoice | undefined = choiceMappings.find((x) => x.playerSymbol === playerSymbol)?.choice;
  const opponentChoice: GameChoice | undefined = choiceMappings.find(
    (x) => x.opponentSymbol === opponentSymbol
  )?.choice;

  if (!playerChoice || !opponentChoice) {
    return 0;
  }

  // Winning combinations for the player
  const playerHasWon =
    (playerChoice === "Rock" && opponentChoice === "Scissors") ||
    (playerChoice === "Paper" && opponentChoice === "Rock") ||
    (playerChoice === "Scissors" && opponentChoice === "Paper");

  // Same symbol is a draw
  const isDraw = playerChoice === opponentChoice;

  return getChoicePoints(playerChoice) + getOutcomePoints(playerHasWon, isDraw);
}

// Split the input data by new lines
const rounds: string[] = input.split("\n");

// Map each round to the score of the round
const roundScores: number[] = rounds.map((x) => {
  const [opponentSymbol, playerSymbol] = x.split(" ");
  return getRoundScore(playerSymbol as PlayerSymbol, opponentSymbol as OpponentSymbol);
});

// Sum the scores of every round
const totalScore = roundScores.reduce((a, b) => a + b, 0);
console.log(totalScore);
