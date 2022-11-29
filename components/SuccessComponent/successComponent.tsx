import { Chip } from "@mui/material";
import React from "react";
import { Texts } from "../../utils/enums";
import styles from "../../styles/Home.module.css";

interface ISuccessComponent {
  brand: string;
  model: string;
  year: number;
  value: string;
}

export const SuccessComponent = ({
  brand,
  model,
  value,
  year,
}: ISuccessComponent): JSX.Element => {
  return (
    <div className={styles.title}>
      <h1>
        {Texts.FIPE_TABLE}: {Texts.PRICE} {brand} {model} {year}
      </h1>
      <Chip label={value} className={styles.successChip} />
      <p className={styles.ps}>{Texts.BUY_PRICE_VEHICLE}</p>
    </div>
  );
};
