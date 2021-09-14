import { PlayerInterface, ResultInterface } from "../context/MatchContext";

export default function verifyResult(players: Array<PlayerInterface>) {
  let result: Array<ResultInterface> = [];
  const finished = players.find(
    (player) =>
      result.find((res) => res.status === "winner") ||
      result.find((res) => res.status === "draw") ||
      (player.isDeal && player.playerStatus === "stoped")
  );
  let isTied = false;
  let highResult: any = { playerId: null, score: null };
  players.map((player) => {
    if (player.playerStatus === "surrender") {
      result = [...result, { playerId: player.id, status: "loser" }];
    }
    if (player.roundPoints > highResult.score && player.roundPoints < 21) {
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
  });
  if (!result.find((res) => res.status === "winner") && finished) {
    const hasDraw = players.filter(
      (res) => res.roundPoints === highResult.score
    );
    if (hasDraw.length > 1) {
      hasDraw.map((res) => {
        result[res.id] = {
          playerId: res.id,
          status: "draw",
        };
      });
    } else {
      result[highResult.playerId] = {
        playerId: highResult.playerId,
        status: "winner",
      };
    }
  }

  return result;
}

//todos pausados === finished?

//highResult === plaw
