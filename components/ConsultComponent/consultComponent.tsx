import { Autocomplete, Button, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { Texts } from "../../utils/enums";
import styles from "../../styles/Home.module.css";
import { FormattedData, InputValues } from "../../utils/types";

interface IConsultComponent {
  carBrandData: FormattedData[];
  handleCarBrandChange: (event: SyntheticEvent<Element, Event>) => void;
  carModelData: FormattedData[];
  handleCarModelChange: (event: SyntheticEvent<Element, Event>) => void;
  carYearData: FormattedData[];
  handleCarYearChange: (event: SyntheticEvent<Element, Event>) => void;
  handleSubmit: () => void;
  inputValues: InputValues;
}

export const ConsultComponent = ({
  carBrandData,
  carModelData,
  carYearData,
  handleCarBrandChange,
  handleCarModelChange,
  handleCarYearChange,
  handleSubmit,
  inputValues,
}: IConsultComponent): JSX.Element => {
  return (
    <>
      <div className={styles.title}>
        <h1>{Texts.FIPE_TABLE}</h1>
        <h3>{Texts.CONSULT}</h3>
      </div>
      <div className={styles.displayer}>
        <div className={styles.inputContainer}>
          <Autocomplete
            className={styles.autocomplete}
            disablePortal
            id="car-brand-combo-box"
            options={carBrandData}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Marca" />}
            onChange={handleCarBrandChange}
          />
          <Autocomplete
            className={styles.autocomplete}
            disablePortal
            id="car-model-combo-box"
            options={carModelData}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
            disabled={!inputValues.brand}
            onChange={handleCarModelChange}
          />
          <Autocomplete
            className={styles.autocomplete}
            disablePortal
            id="car-year-combo-box"
            options={carYearData}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Ano" />}
            disabled={!inputValues.model || !inputValues.brand}
            onChange={handleCarYearChange}
          />

          <Button
            variant="contained"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            {Texts.CONSULT_PRICE}
          </Button>
        </div>
      </div>
    </>
  );
};
