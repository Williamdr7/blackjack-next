/* eslint-disable @next/next/no-img-element */
import React from "react";
import ActionMenu from "../ActionMenu";
import styles from "./styles.module.scss";
import Carrousel from "../../components/Carrrousel";
import { CardInterface } from "../../context/MatchContext";

type Props = {
  cards: Array<CardInterface>;
  playerId: number;
  isDealer: boolean;
  showDealerScore: any;
};

export default function Deck({
  cards,
  playerId,
  isDealer,
  showDealerScore,
}: Props) {
  return (
    <div>
      <div className={styles.cardsContainer}>
        <Carrousel className={styles.carrousel}>
          {cards.map((card, i) => {
            return (
              <div key={card.value + i} className={styles.cardContainer}>
                <img
                  className={styles.image}
                  alt={card.value}
                  src={
                    !isDealer || i !== 0 || showDealerScore(isDealer, i)
                      ? card.image
                      : "/back32.png"
                  }
                />
              </div>
            );
          })}
        </Carrousel>
      </div>
      <ActionMenu playerId={playerId} isDealer={isDealer} />
    </div>
  );
}
