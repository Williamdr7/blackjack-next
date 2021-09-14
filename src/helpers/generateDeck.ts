import setInitialPlayers from "./setInitialPlayers";
import DeckService from "../services/DeckService";
export default async function generateDeck(playersNumber: number) {
  let newPlayers = [...setInitialPlayers(playersNumber)];
  let deckId = "";
  await DeckService.createDeck()
    .then(async ({ data }) => {
      await DeckService.getCards(data.deck_id, playersNumber * 2)
        .then((response) => {
          let cardsArray = response.data.cards;
          for (let i = 0; i < cardsArray.length; i++) {
            if (i < playersNumber) {
              const olderPlayer = newPlayers.find((player) => player.id === i);
              if (olderPlayer) {
                newPlayers = newPlayers.filter((player) => player.id !== i);
                newPlayers = [
                  //@ts-ignore
                  ...newPlayers,
                  {
                    ...olderPlayer,
                    //@ts-ignore
                    cards: [...olderPlayer.cards, cardsArray[i]],
                  },
                ];
              }
            } else {
              const olderPlayer = newPlayers.find(
                (player) => player.id === i - playersNumber
              );

              if (olderPlayer) {
                newPlayers = newPlayers.filter(
                  (player) => player.id !== i - playersNumber
                );
                newPlayers = [
                  //@ts-ignore
                  ...newPlayers,
                  {
                    ...olderPlayer,
                    //@ts-ignore
                    cards: [...olderPlayer.cards, cardsArray[i]],
                  },
                ];
              }
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
      deckId = data.deck_id;
    })
    .catch((error) => console.error(error));

  return { deckId, players: newPlayers };
}
