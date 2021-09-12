/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import ActionMenu from "../ActionMenu";
import styles from "./styles.module.scss";
import Carrousel from "../../components/Carrrousel";
import MatchContext, { CardInterface } from "../../context/MatchContext";

type Props = {
  cards: Array<CardInterface>;
  playerId: number;
  isDealer: boolean;
  playerStatus: string;
};

export default function Deck({ cards, playerId, isDealer }: Props) {
  return (
    <div>
      <div className={styles.cardsContainer}>
        <Carrousel className={styles.carrousel}>
          {cards.map((card) => (
            <div className={styles.cardContainer} key={card.value}>
              <img className={styles.image} alt={card.value} src={card.image} />
            </div>
          ))}
        </Carrousel>
      </div>
      <ActionMenu playerId={playerId} isDealer={isDealer} />
    </div>
  );
}
