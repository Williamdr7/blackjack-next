import { Fab, Modal, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./styles.module.scss";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
export default function ResultModal({ playerId, handleClose, isOpen }: any) {
  return (
    <Modal open={isOpen} className={styles.container} onClose={handleClose}>
      <div className={styles.content}>
        <Typography variant="h3" color="primary" noWrap>
          Player {playerId} Venceu!
        </Typography>
        <div className={styles.restartIcon}>
          <Fab
            onClick={handleClose}
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
