import { GetStaticProps } from "next";
import router from "next/router";
import { createContext, useEffect, useState } from "react";
import generateDeck from "../helpers/generateDeck";
import setCardValue from "../helpers/setCardValue";
import verifyMatchStatus from "../helpers/verifyMatchStatus";
import verifyResult from "../helpers/verifyResult";
import DeckService from "../services/DeckService";

type matchContextType = {
  players: Array<PlayerInterface>;
  setPlayers: any;
  requestCard: any;
  matchStatus: string;
  setMatchStatus: any;
  setPlayersNumber: any;
  changePlayerStatus: any;
  result: Array<ResultInterface>;
  resetContext: any;
};

const matchContextDefaultValues: matchContextType = {
  players: [],
  result: [],
  matchStatus: "playersRound",
  setPlayers: () => null,
  requestCard: () => null,
  setMatchStatus: () => null,
  changePlayerStatus: () => null,
  resetContext: () => null,
  setPlayersNumber: () => null,
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
  const [playersNumber, setPlayersNumber] = useState<number>(0);
  const [players, setPlayers] = useState<Array<PlayerInterface>>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [matchStatus, setMatchStatus] = useState<string>("playersRound");
  const [result, setResult] = useState<Array<ResultInterface>>([]);

  useEffect(() => {
    generateDeck(playersNumber)
      .then((result) => {
        setPlayers(setCardValue(result.players));
        setDeckId(result.deckId);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersNumber]);

  function requestCard(playerId: number) {
    DeckService.getCards(deckId, 1)
      .then(({ data }) => {
        let newPlayers = [...players];

        newPlayers[playerId].cards = [
          ...newPlayers[playerId].cards,
          data.cards[0],
        ];

        setPlayers(setCardValue(newPlayers));
        updateStatuses(newPlayers);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePlayerStatus(id: number, status: string) {
    let newPlayers = [...players];
    newPlayers[id].playerStatus = status;
    setPlayers(newPlayers);
    updateStatuses(newPlayers);
  }

  function resetContext() {
    setPlayers([]);
    setPlayersNumber(0);
    setMatchStatus("playersRound");
    setResult([]);
    router.reload();
  }

  function updateStatuses(newPlayers: Array<PlayerInterface>) {
    const currentResult = verifyResult(newPlayers);
    const currentStatus = verifyMatchStatus(newPlayers, currentResult);
    setMatchStatus(currentStatus);
    setResult(currentResult);
  }

  useEffect(() => {
    updateStatuses(players);
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
        setPlayersNumber,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export default MatchContext;

export { MatchContextProvider };
