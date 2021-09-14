import { GetStaticProps } from "next";
import router from "next/router";
import { createContext, useEffect, useState } from "react";
import generateDeck from "../helpers/generateDeck";
import setCardValue from "../helpers/setCardValue";
import updateRoundTime from "../helpers/updateRoundTime";
import verifyMatchStatus from "../helpers/verifyMatchStatus";
import verifyResult from "../helpers/verifyResult";
import DeckService from "../services/DeckService";

type matchContextType = {
  players: Array<PlayerInterface>;
  setPlayers: any;
  requestCard: any;
  roundTime: number;
  matchStatus: string;
  setMatchStatus: any;
  setPlayersNumber: any;
  changePlayerStatus: any;
  result: Array<ResultInterface>;
  resetContext: any;
  surrender: any;
};

const matchContextDefaultValues: matchContextType = {
  players: [],
  result: [],
  matchStatus: "playersRound",
  roundTime: 1,
  setPlayers: () => null,
  requestCard: () => null,
  setMatchStatus: () => null,
  changePlayerStatus: () => null,
  resetContext: () => null,
  setPlayersNumber: () => null,
  surrender: () => null,
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
  const [roundTime, setRoundTime] = useState(1);

  useEffect(() => {
    generateDeck(playersNumber)
      .then((result) => {
        setPlayers(setCardValue(result.players));
        setDeckId(result.deckId);
      })
      .catch((err) => {
        console.error(err);
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
        setRoundTime(updateRoundTime(newPlayers, roundTime));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function changePlayerStatus(id: number, status: string) {
    let newPlayers = [...players];
    newPlayers[id].playerStatus = status;
    setPlayers(newPlayers);
    updateStatuses(newPlayers);
    setRoundTime(updateRoundTime(newPlayers, roundTime));
  }

  function resetContext() {
    setPlayers([]);
    setPlayersNumber(0);
    setMatchStatus("playersRound");
    setResult([]);
    router.reload();
  }

  function surrender(id: number) {
    let newPlayers = [...players];
    newPlayers[id].playerStatus = "surrender";
    setRoundTime(updateRoundTime(newPlayers, roundTime));
    updateStatuses(newPlayers);
  }

  function updateStatuses(newPlayers: Array<PlayerInterface>) {
    const currentResult = verifyResult(newPlayers);
    const currentStatus = verifyMatchStatus(newPlayers, currentResult);
    setMatchStatus(currentStatus);
    setResult(currentResult);
  }

  useEffect(() => {
    if (players && players.length) {
      updateStatuses(players);
    }
  }, [players]);

  return (
    <MatchContext.Provider
      value={{
        players,
        matchStatus,
        result,
        roundTime,
        setPlayers,
        resetContext,
        requestCard,
        setMatchStatus,
        changePlayerStatus,
        setPlayersNumber,
        surrender,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export default MatchContext;

export { MatchContextProvider };
