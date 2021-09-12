import React from "react";
import { Card, Typography } from "@material-ui/core";
import styles from "./styles.module.scss";

type Props = {
  count: number;
};

export default function Counter({ count }: Props) {
  return (
    <Card className={styles.container}>
      <Typography className={styles.title} variant="h2" color="primary" noWrap>
        {count}
      </Typography>
    </Card>
  );
}
