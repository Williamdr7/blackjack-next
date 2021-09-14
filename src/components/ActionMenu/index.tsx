import React, { useContext, useState } from "react";
import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PanToolIcon from "@material-ui/icons/PanTool";
import styles from "./styles.module.scss";
import MatchContext from "../../context/MatchContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

type Props = {
  isDealer: boolean;
  playerId: number;
};

export default function ActionMenu({ isDealer, playerId }: Props) {
  const {
    matchStatus,
    requestCard,
    changePlayerStatus,
    players,
    result,
    roundTime,
    surrender,
  } = useContext(MatchContext);
  const [stoped, setStoped] = useState<boolean>(false);

  const handleAction = (type: string) => {
    if (type === "request") requestCard(playerId);
    else {
      changePlayerStatus(playerId, "stoped");
      setStoped(true);
    }
  };

  const iconsDisabled =
    (result &&
      result.length > 0 &&
      result[playerId] &&
      result[playerId].status === "loser") ||
    playerId !== roundTime;
  return (
    <Container className={styles.container}>
      <Fab
        onClick={() => handleAction("request")}
        variant="extended"
        disabled={
          (matchStatus !== "dealerRound" && isDealer) ||
          (players[playerId].playerStatus === "stoped" && !isDealer) ||
          iconsDisabled
        }
        color="primary"
        aria-label="add"
      >
        <AddIcon />
        Carta
      </Fab>
      <Fab
        onClick={() => surrender(playerId)}
        variant="extended"
        disabled={
          isDealer ||
          (players[playerId].playerStatus === "stoped" && !isDealer) ||
          iconsDisabled
        }
        aria-label="add"
        color="secondary"
        className={styles.surrenderIcon}
      >
        <ExitToAppIcon />
        Rendição
      </Fab>

      <Fab
        onClick={() => handleAction("stop")}
        disabled={
          stoped || iconsDisabled || (matchStatus !== "dealerRound" && isDealer)
        }
        variant="extended"
        color="secondary"
        aria-label="edit"
      >
        <PanToolIcon className={styles.stopIcon} />
        Parar
      </Fab>
    </Container>
  );
}
