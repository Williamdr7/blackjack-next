export default function setInitialPlayers(playersNumber: number) {
  const players = [];
  for (let i = 0; i < playersNumber; i++) {
    players.push({
      id: i,
      isDeal: i === 0 ? true : false,
      roundPoints: 0,
      playerStatus: "playing",
      cards: [],
    });
  }
  return players;
}
