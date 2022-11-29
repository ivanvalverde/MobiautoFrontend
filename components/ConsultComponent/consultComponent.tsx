import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { Texts } from "../../utils/enums";
import styles from "../../styles/Home.module.css";
import { FormattedData, InputValues, LoadingState } from "../../utils/types";

interface IConsultComponent {
  carBrandData: FormattedData[];
  handleCarBrandChange: (event: SyntheticEvent<Element, Event>) => void;
  carModelData: FormattedData[];
  handleCarModelChange: (event: SyntheticEvent<Element, Event>) => void;
  carYearData: FormattedData[];
  handleCarYearChange: (event: SyntheticEvent<Element, Event>) => void;
  handleSubmit: () => void;
  inputValues: InputValues;
  loadingData: LoadingState;
  getOptionLabel: (option: FormattedData) => string;
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
  loadingData,
  getOptionLabel,
}: IConsultComponent): JSX.Element => {
  const isSubmitBtnDisabled =
    !inputValues.model.code ||
    !inputValues.brand.code ||
    !inputValues.year.code;
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
            getOptionLabel={getOptionLabel}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Marca" />}
            onChange={handleCarBrandChange}
            loading={loadingData?.brand}
            value={inputValues?.brand}
            clearOnBlur
          />
          <Autocomplete
            className={styles.autocomplete}
            disablePortal
            id="car-model-combo-box"
            options={carModelData}
            getOptionLabel={getOptionLabel}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
            disabled={!carModelData.length}
            onChange={handleCarModelChange}
            loading={loadingData?.model}
            value={inputValues?.model}
            clearOnBlur
          />
          <Autocomplete
            className={styles.autocomplete}
            disablePortal
            id="car-year-combo-box"
            options={carYearData}
            getOptionLabel={getOptionLabel}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Ano" />}
            disabled={!carModelData.length || !carYearData.length}
            onChange={handleCarYearChange}
            loading={loadingData?.year}
            value={inputValues?.year}
            clearOnBlur
          />

          <Button
            variant="contained"
            className={`${styles.btn} ${
              isSubmitBtnDisabled ? styles.disabledBtn : styles.submitBtn
            }`}
            onClick={handleSubmit}
            disabled={isSubmitBtnDisabled}
          >
            {loadingData?.submit ? (
              <CircularProgress sx={{ color: "#FFFFFF" }} />
            ) : (
              Texts.CONSULT_PRICE
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
