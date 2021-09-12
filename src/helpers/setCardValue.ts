import { PlayerInterface } from "../context/MatchContext";

export default function setCardValue(
  players: Array<PlayerInterface>,
  setPlayers: any
) {
  let newPlayers = players;
  players.map((player, i: number) => {
    let playerScore = 0;
    let hasAs = false;
    player.cards.map((card: any) => {
      const cardValue = switchValue(card.code);
      if (cardValue !== "A") {
        playerScore += cardValue;
      } else {
        hasAs = true;
      }
    });
    if (hasAs && playerScore + 11 > 21) {
      playerScore += 1;
    }
    if (hasAs && playerScore + 11 <= 21) playerScore += 11;
    newPlayers[i].roundPoints = playerScore;
  });

  setPlayers(newPlayers);
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
