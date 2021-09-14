import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Counter from "../../components/Counter";
import Deck from "../../components/Deck";
import styles from "./styles.module.scss";
import MatchContext, { PlayerInterface } from "../../context/MatchContext";
import ResultModal from "../../components/ResultModal/ResultModal";

type Props = {
  numberOfPlayers: number;
};
const Match = (props: Props) => {
  const { players, matchStatus, resetContext, result, setPlayersNumber } =
    useContext(MatchContext);

  function handleClose() {
    resetContext();
  }

  useEffect(() => {
    setPlayersNumber(props.numberOfPlayers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const showDealerScore = (isDealer: boolean, i: number) => {
    if (
      isDealer &&
      i === 0 &&
      (matchStatus === "dealerRound" || matchStatus === "finished")
    )
      return true;
    else return false;
  };

  return (
    <>
      <ResultModal
        handleClose={handleClose}
        isOpen={matchStatus === "finished"}
      />
      <Grid container className={styles.gridContainer}>
        {players
          .sort((a, b) => a.id - b.id)
          .map((player: PlayerInterface, i: number) => (
            <Grid
              className={styles.gridItem}
              key={player.id}
              item
              //@ts-ignore
              xs={12 / (players.length || 1)}
            >
              {player.isDeal ? (
                <Typography
                  className={styles.dealer}
                  variant="h4"
                  color="secondary"
                  noWrap
                >
                  *Dealer
                </Typography>
              ) : (
                <Typography
                  className={styles.dealer}
                  variant="h4"
                  color="secondary"
                  noWrap
                >
                  Player {player.id}
                </Typography>
              )}
              {!player.isDeal || showDealerScore(player.isDeal, i) ? (
                <Counter count={player.roundPoints} />
              ) : null}

              <Typography
                className={styles.status}
                variant="h6"
                color="primary"
                noWrap
              >
                {result && result[0] && result[player.id].status === "loser"
                  ? "LOSER"
                  : player.playerStatus.toUpperCase()}
              </Typography>

              <Deck
                showDealerScore={showDealerScore}
                isDealer={!!player.isDeal}
                playerId={player.id}
                cards={player.cards}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  let playersNumber = params.playersNumber;

  return {
    props: { numberOfPlayers: playersNumber || "2" },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { playersNumber: "2" } },
    { params: { playersNumber: "3" } },
    { params: { playersNumber: "4" } },
  ];

  return { paths, fallback: false };
};
export default Match;
