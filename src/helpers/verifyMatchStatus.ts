import { PlayerInterface, ResultInterface } from "../context/MatchContext";

export default function verifyMatchStatus(
  players: Array<PlayerInterface>,
  result: Array<ResultInterface>
) {
  let currentPlayers = players;
  result
    .filter((res) => res.status === "loser")
    .map((player) => (currentPlayers[player.playerId].playerStatus = "stoped"));

  const hasPlayerPlaying = currentPlayers.find(
    (player: PlayerInterface) =>
      player.playerStatus !== "stoped" && !player.isDeal
  );

  const allPlayersAreLosers =
    result.filter((res) => res.status === "loser").length ===
    currentPlayers.length - 1;

  if (
    (!hasPlayerPlaying && allPlayersAreLosers) ||
    result.find((value) => value.status === "winner") ||
    result.find((value) => value.status === "draw") ||
    result.filter((value) => value.status === "loser").length ===
      currentPlayers.length - 1
  )
    return "finished";

  if (!hasPlayerPlaying) {
    return "dealerRound";
  }
  return "running";
}
