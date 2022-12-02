import { input } from "./input";
import { choiceMappings, OpponentSymbol, outcomeMappings, PlayerSymbol } from "./mappings";

// How many points do you get for a game choice (regardless of the outcome?)
function getChoicePoints(opponentSymbol: OpponentSymbol, outcomeSymbol: PlayerSymbol) {
  const opponentChoice = choiceMappings.find((x) => x.opponentSymbol === opponentSymbol)?.choice;

  // Winning outcome
  if (outcomeSymbol === "Z") {
    // Need to find the game choice the player should choose to win against the opponent choice
    const winningPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.win;
    return choiceMappings.find((x) => x.choice === winningPlayerChoice)?.points ?? 0;
  }

  if (outcomeSymbol === "Y") {
    const drawingPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.draw;
    return choiceMappings.find((x) => x.choice === drawingPlayerChoice)?.points ?? 0;
  }

  const losingPlayerChoice = outcomeMappings.find((x) => x.opponentChoice === opponentChoice)?.lose;
  return choiceMappings.find((x) => x.choice === losingPlayerChoice)?.points ?? 0;
}

// How many points do you get for each round outcome?
function getOutcomePoints(outcomeSymbol: PlayerSymbol) {
  if (outcomeSymbol === "Z") {
    return 6;
  }

  if (outcomeSymbol === "Y") {
    return 3;
  }

  return 0;
}

// How many total points for the round?
function getRoundScore(opponentSymbol: OpponentSymbol, outcomeSymbol: PlayerSymbol) {
  return getOutcomePoints(outcomeSymbol) + getChoicePoints(opponentSymbol, outcomeSymbol);
}

// Split the input data by new lines
const rounds: string[] = input.split("\n");

// Map each round to the score of the round
const roundScores: number[] = rounds.map((x) => {
  const [opponentSymbol, outcomeSymbol] = x.split(" ");
  return getRoundScore(opponentSymbol as OpponentSymbol, outcomeSymbol as PlayerSymbol);
});

// Sum the scores of every round
const totalScore = roundScores.reduce((a, b) => a + b, 0);
console.log(totalScore);
