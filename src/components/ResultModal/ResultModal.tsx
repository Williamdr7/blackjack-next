import { Fab, Modal, Typography } from "@material-ui/core";
import styles from "./styles.module.scss";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { useContext } from "react";
import MatchContext from "../../context/MatchContext";
export default function ResultModal({ handleClose, isOpen }: any) {
  const { result, resetContext } = useContext(MatchContext);
  const winner = result.find((player) => player.status === "winner");
  const draw = result.filter((player) => player.status === "draw");
  const resultString = () => {
    if (draw && draw[0]) {
      return `Empate entre os players ${draw[0].playerId}, ${
        draw[1]?.playerId
      } ${draw[2]?.playerId || ""}  ${draw[3]?.playerId || ""}`;
    } else {
      return `Player ${
        !!winner?.playerId ? winner?.playerId : "Dealer"
      } Venceu`;
    }
  };
  return (
    <Modal open={isOpen} className={styles.container} onClose={resetContext}>
      <div className={styles.content}>
        <Typography variant="h3" color="primary" noWrap>
          {resultString()}
        </Typography>
        <div className={styles.restartIcon}>
          <Fab
            onClick={resetContext}
            variant="extended"
            color="primary"
            aria-label="add"
          >
            <SettingsBackupRestoreIcon />
            <p>Iniciar outro round</p>
          </Fab>
        </div>
      </div>
    </Modal>
  );
}
