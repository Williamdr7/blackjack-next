import { PlayerInterface, ResultInterface } from "../context/MatchContext";

export default function verifyMatchStatus(
  players: Array<PlayerInterface>,
  result: Array<ResultInterface>
) {
  const hasPlayerPlaying = players.find(
    (player: PlayerInterface) =>
      player.playerStatus !== "stoped" && !player.isDeal
  );

  if (
    !hasPlayerPlaying &&
    players &&
    players[0] &&
    players[0].playerStatus === "playing"
  ) {
    console.log("dealerRound");
    return "dealerRound";
  }
  if (
    (!hasPlayerPlaying &&
      players &&
      players[0] &&
      players[0].playerStatus !== "playing") ||
    result.find((value) => value.status === "winner") ||
    result.filter((value) => value.status === "loser").length ===
      players.length - 1
  )
    return "finished";
  else return "running";
}
