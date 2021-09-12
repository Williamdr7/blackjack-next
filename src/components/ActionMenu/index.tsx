import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PanToolIcon from "@material-ui/icons/PanTool";
import styles from "./styles.module.scss";
import MatchContext from "../../context/MatchContext";

type Props = {
  isDealer: boolean;
  playerId: number;
};

export default function ActionMenu({ isDealer, playerId }: Props) {
  const { matchStatus, requestCard, changePlayerStatus, players } =
    useContext(MatchContext);
  const [stoped, setStoped] = useState<boolean>(false);

  const handleAction = (type: string) => {
    if (type === "request") requestCard(playerId);
    else {
      changePlayerStatus(playerId, "stoped");
      setStoped(true);
    }
  };
  return (
    <Container className={styles.container}>
      <Fab
        onClick={() => handleAction("request")}
        variant="extended"
        disabled={matchStatus === "playersRound" && isDealer}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
        Carta
      </Fab>

      <Fab
        onClick={() => handleAction("stop")}
        disabled={stoped}
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
