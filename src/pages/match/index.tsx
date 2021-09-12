import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import type { NextPage } from "next";
import Counter from "../../components/Counter";
import Deck from "../../components/Deck";
import styles from "./styles.module.scss";
import MatchContext, { PlayerInterface } from "../../context/MatchContext";
import ResultModal from "../../components/ResultModal/ResultModal";

const Match: NextPage = () => {
  const { players, setPlayers, matchStatus } = useContext(MatchContext);

  return (
    <>
      <ResultModal isOpen={matchStatus === "finished"} playerId={1} />
      <Grid container className={styles.gridContainer}>
        {players
          .sort((a, b) => a.id - b.id)
          .map((player: PlayerInterface) => (
            <Grid
              className={styles.gridItem}
              key={player.id}
              item
              //@ts-ignore
              xs={12 / (players.length || 1)}
            >
              {player.isDeal && (
                <Typography
                  className={styles.dealer}
                  variant="h4"
                  color="secondary"
                  noWrap
                >
                  *Dealer
                </Typography>
              )}
              <Counter count={player.roundPoints} />
              <Deck
                isDealer={player.isDeal}
                playerId={player.id}
                cards={player.cards}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Match;
