import { Fab, Modal, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./styles.module.scss";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { useContext } from "react";
import MatchContext from "../../context/MatchContext";
export default function ResultModal({ handleClose, isOpen }: any) {
  const { result, resetContext } = useContext(MatchContext);
  const winner = result.find((player) => player.status === "winner");

  return (
    <Modal open={isOpen} className={styles.container} onClose={resetContext}>
      <div className={styles.content}>
        <Typography variant="h3" color="primary" noWrap>
          Player {winner?.playerId} Venceu!
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
