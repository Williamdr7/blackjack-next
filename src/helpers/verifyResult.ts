import { PlayerInterface, ResultInterface } from "../context/MatchContext";

export default function verifyResult(players: Array<PlayerInterface>) {
  let result: Array<ResultInterface> = [];

  const allSurrendered =
    players.filter((player) => player.playerStatus === "surrender").length ===
    3;
  const finished = players.find(
    (player) =>
      result.find((res) => res.status === "winner") ||
      result.find((res) => res.status === "draw") ||
      (player.isDeal && player.playerStatus === "stoped")
  );
  let isTied = false;
  let highResult: any = { playerId: null, score: null };

  players.map((player) => {
    if (
      highResult.playerId &&
      players[highResult.playerId].playerStatus === "surrender"
    ) {
      highResult = { playerId: null, score: null };
    }

    if (player.playerStatus === "surrender") {
      if (result[player.id]) {
        result[player.id] = { playerId: player.id, status: "loser" };
      } else {
        result = [...result, { playerId: player.id, status: "loser" }];
      }
    } else {
      if (
        player.roundPoints > highResult.score &&
        player.roundPoints < 21 &&
        player.playerStatus !== "surrender"
      ) {
        highResult = { playerId: player.id, score: player.roundPoints };
      }
      if (player.roundPoints == highResult.score) {
        isTied = true;
      }
      if (player.roundPoints > 21) {
        result = [...result, { playerId: player.id, status: "loser" }];
      }
      if (
        (player.roundPoints === 21 && !player.isDeal) ||
        (player.roundPoints === 21 &&
          !players.find((playerObj) => playerObj.playerStatus === "playing"))
      ) {
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
    }

    return true;
  });

  if (!result.find((res) => res.status === "winner") && finished) {
    const maxResult = Math.max(
      ...players.map((player) => {
        if (result[player.id].status !== "loser") {
          return player.roundPoints;
        } else return 0;
      })
    );
    const hasDraw = players.filter((res) => res.roundPoints === maxResult);
    if (
      hasDraw.length > 1 &&
      players[highResult.playerId].playerStatus !== "surrender"
    ) {
      hasDraw.map((res) => {
        result[res.id] = {
          playerId: res.id,
          status: "draw",
        };
      });
    } else {
      result[hasDraw[0].id] = {
        playerId: hasDraw[0].id,
        status: "winner",
      };
    }
  }

  if (allSurrendered) {
    result[0] = {
      playerId: players[0].id,
      status: "winner",
    };
  }

  return result;
}
