import { PlayerInterface, ResultInterface } from "../context/MatchContext";

export default function verifyResult(players: Array<PlayerInterface>) {
  let result: Array<ResultInterface> = [];
  const finished = !players.find((player) => player.playerStatus !== "stoped");
  let highResult: any = { playerId: null, score: null };
  players.map((player) => {
    if (player.roundPoints > highResult.score && player.roundPoints < 21) {
      highResult = { playerId: player.id, score: player.roundPoints };
    }
    if (player.roundPoints > 21) {
      result = [...result, { playerId: player.id, status: "loser" }];
    }
    if (player.roundPoints === 21) {
      result = [...result, { playerId: player.id, status: "winner" }];
    }
    if (player.roundPoints < 21) {
      result = [
        ...result,
        {
          playerId: player.id,
          status: "playing",
        },
      ];
    }
  });
  if (!result.find((res) => res.status === "winner") && finished) {
    result[highResult.playerId] = {
      playerId: highResult.playerId,
      status: "winner",
    };
  }

  return result;
}
