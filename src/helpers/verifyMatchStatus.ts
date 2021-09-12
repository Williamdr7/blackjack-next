import { PlayerInterface } from "../context/MatchContext";

export default function verifyMatchStatus(
  players: Array<PlayerInterface>,
  setMatchStatus: any
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
  )
    setMatchStatus("dealerRounded");
  if (
    !hasPlayerPlaying &&
    players &&
    players[0] &&
    players[0].playerStatus !== "playing"
  )
    setMatchStatus("finished");
}
