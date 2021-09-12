/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";

export default function Carrousel({ children }: any) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    vertical: false,
    verticalSwiping: false,
    centerMode: true,
    centerPadding: "40px",
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
