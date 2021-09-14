import { useRouter } from "next/router";
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
  loading: boolean;
};

const matchContextDefaultValues: matchContextType = {
  players: [],
  result: [],
  matchStatus: "playersRound",
  roundTime: 1,
  loading: true,
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
  const router = useRouter();
  const [playersNumber, setPlayersNumber] = useState<
    number | string | object | undefined
  >(router.query.playersNumber);
  const [players, setPlayers] = useState<Array<PlayerInterface>>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [matchStatus, setMatchStatus] = useState<string>("playersRound");
  const [result, setResult] = useState<Array<ResultInterface>>([]);
  const [roundTime, setRoundTime] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    generateDeck(playersNumber)
      .then((result) => {
        setPlayers(setCardValue(result.players));
        setDeckId(result.deckId);
        setLoading(false);
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
    setLoading(true);
    setRoundTime(1);
    setPlayers([]);
    setMatchStatus("playersRound");
    setResult([]);
    router.reload();
  }

  function surrender(id: number) {
    let newPlayers = players;
    newPlayers[id].playerStatus = "surrender";

    console.log(newPlayers);
    setRoundTime(updateRoundTime(newPlayers, roundTime));
    updateStatuses(newPlayers);
    setPlayers(newPlayers);
  }

  function updateStatuses(newPlayers: Array<PlayerInterface>) {
    const currentResult = verifyResult(newPlayers);
    const currentStatus = verifyMatchStatus(newPlayers, currentResult);

    setMatchStatus(currentStatus);
    setResult(currentResult);
  }

  useEffect(() => {
    if (players.length) {
      console.log("Chamou set geral");
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
        loading,
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
