import { PlayerInterface } from "../context/MatchContext";

export default function updateRoundTime(
  newPlayers: Array<PlayerInterface>,
  roundTime: number
) {
  const playingPlayers = newPlayers
    .filter((player) => player.playerStatus === "playing" && !player.isDeal)
    .sort((a, b) => a.id - b.id);
  const currentPlayer = playingPlayers.findIndex(
    (player) => player.id === roundTime
  );
  if (currentPlayer === playingPlayers.length - 1) {
    if (currentPlayer === -1) return 0;
    else return playingPlayers[0].id;
  }
  if (!playingPlayers.length) {
    return 0;
  }

  return playingPlayers[currentPlayer + 1].id;
}
