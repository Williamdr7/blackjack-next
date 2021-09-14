import { PlayerInterface } from "../context/MatchContext";

export default function setCardValue(players: Array<PlayerInterface>) {
  let newPlayers = players;
  players.map((player, i: number) => {
    let playerScore = 0;
    let hasAs = 0;
    player.cards.map((card: any) => {
      const cardValue = switchValue(card.code);
      if (cardValue !== "A") {
        playerScore += cardValue;
      } else {
        hasAs++;
      }
      return true;
    });

    for (let i = 0; i < hasAs; i++) {
      if (playerScore + 11 > 21) {
        playerScore += 1;
      }
      if (playerScore + 11 <= 21) playerScore += 11;
    }

    newPlayers[i].roundPoints = playerScore;
    return true;
  });

  return newPlayers;
}

function switchValue(value: string) {
  const type = value.substring(0, 1);

  if (parseInt(type) > 0 && parseInt(type) < 10) {
    return parseInt(type);
  }

  if (type === "J" || type === "Q" || type === "K" || type === "0") {
    return 10;
  }

  if (type === "A") {
    return type;
  }

  return 0;
}
