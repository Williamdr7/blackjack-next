import { createContext, useEffect, useState } from "react";
import setCardValue from "../helpers/setCardValue";
import setInitialPlayers from "../helpers/setInitialPlayers";
import verifyMatchStatus from "../helpers/verifyMatchStatus";
import verifyResult from "../helpers/verifyResult";
import DeckService from "../services/DeckService";

type matchContextType = {
  players: Array<PlayerInterface>;
  setPlayers: any;
  requestCard: any;
  matchStatus: string;
  setMatchStatus: any;
  changePlayerStatus: any;
  result: Array<ResultInterface>;
  resetContext: any;
};

const matchContextDefaultValues: matchContextType = {
  players: [],
  result: [],
  setPlayers: () => null,
  requestCard: () => null,
  matchStatus: "playersRound",
  setMatchStatus: () => null,
  changePlayerStatus: () => null,
  resetContext: () => null,
};

const MatchContext = createContext<matchContextType>(matchContextDefaultValues);

export interface PlayerInterface {
  id: number;
  isDeal: boolean;
  roundPoints: number;
  cards: Array<CardInterface>;
  playerStatus: string;
}

export interface CardInterface {
  image: string;
  value: string;
  suit: string;
  code: string;
}

export interface ResultInterface {
  playerId: number;
  status: string;
}

function MatchContextProvider({ children }: any) {
  const [playersNumber, setPlayersNumber] = useState<number>(4);
  const [unusedDeck, setUnusedDeck] = useState<Array<CardInterface>>([]);
  const [players, setPlayers] = useState<Array<PlayerInterface>>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [matchStatus, setMatchStatus] = useState<string>("playersRound");
  const [result, setResult] = useState<Array<ResultInterface>>([]);

  async function generateDeck() {
    let newPlayers = [...setInitialPlayers(playersNumber)];
    DeckService.createDeck()
      .then(({ data }) => {
        DeckService.getCards(data.deck_id, playersNumber * 2).then(
          (response) => {
            let cardsArray = response.data.cards;
            for (let i = 0; i < cardsArray.length; i++) {
              if (i < playersNumber) {
                const olderPlayer = newPlayers.find(
                  (player) => player.id === i
                );
                if (olderPlayer) {
                  newPlayers = newPlayers.filter((player) => player.id !== i);
                  newPlayers = [
                    ...newPlayers,
                    {
                      ...olderPlayer,
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
                    ...newPlayers,
                    {
                      ...olderPlayer,
                      cards: [...olderPlayer.cards, cardsArray[i]],
                    },
                  ];
                }
              }
            }
            setCardValue(newPlayers, setPlayers);
            setDeckId(data.deck_id);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    generateDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersNumber]);

  function requestCard(playerId: number) {
    let olderPlayer = players.find((player) => player.id === playerId);
    DeckService.getCards(deckId, 1).then(({ data }) => {
      let newPlayers = [
        ...players.filter((player) => player.id !== playerId),
        { ...olderPlayer, cards: [...olderPlayer?.cards, data.cards[0]] },
      ];
      setCardValue(newPlayers, setPlayers);
    });
  }

  function changePlayerStatus(id: number, status: string) {
    let newPlayers = players;
    newPlayers[id] = { ...newPlayers[id], playerStatus: status };
    setPlayers(newPlayers);
  }

  function resetContext() {
    setPlayersNumber(2);
    setMatchStatus("playersRound");
    setResult([]);
  }

  useEffect(() => {
    verifyResult(players, resetContext);
    verifyMatchStatus(players, setMatchStatus);
  }, [players]);

  return (
    <MatchContext.Provider
      value={{
        players,
        matchStatus,
        result,
        setPlayers,
        resetContext,
        requestCard,
        setMatchStatus,
        changePlayerStatus,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export default MatchContext;

export { MatchContextProvider };
