import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./styles.module.scss";
export default function Header() {
  return (
    <AppBar className={styles.container} position="static">
      <Toolbar>
        <Typography className={styles.title} variant="h2" noWrap>
          BlackJack App
        </Typography>
        <Typography className={styles.login} variant="h2" noWrap>
          Login
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
