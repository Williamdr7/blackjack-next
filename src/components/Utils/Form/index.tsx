import React, { useContext } from "react";
import { Fab, Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useForm } from "react-hook-form";
import MatchContext from "../../../context/MatchContext";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();
  const { setPlayersNumber } = useContext(MatchContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setPlayersNumber(data.playersNumber), console.log(data);
    router.push("/match");
  };

  return (
    <form
      className={styles.form}
      color="primary"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.container}>
        <Typography variant="h3" color="secondary" noWrap>
          React-hook-form
        </Typography>
        <input
          className={styles.input}
          defaultValue="William Duarte"
          {...register("nome")}
        />

        <input
          defaultValue="williamduarte499@gmail.com"
          className={styles.input}
          {...register("email")}
        />
        <Typography variant="h5" color="primary" noWrap>
          Número de Jogadores
        </Typography>
        <select className={styles.select} {...register("playersNumber")}>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        {errors.exampleRequired && <span>This field is required</span>}

        <Fab
          onClick={handleSubmit(onSubmit)}
          variant="extended"
          className={styles.button}
          color="primary"
          aria-label="add"
        >
          <PlayCircleOutlineIcon />
          Iniciar Partida
        </Fab>
      </div>
    </form>
  );
}
