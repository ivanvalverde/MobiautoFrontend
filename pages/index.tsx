import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import ConsultComponent from "../components/ConsultComponent";
import { CarContext } from "../components/context";
import SuccessComponent from "../components/SuccessComponent";
import styles from "../styles/Home.module.css";
import { FormattedData } from "../utils/types";

const Home = (): JSX.Element => {
  const {
    carBrand,
    carModel,
    carValue,
    carYear,
    inputValues,
    setCarBrand,
    setCarModel,
    setCarValue,
    setCarYear,
    setInputValues,
    loading,
    setLoading,
  } = useContext(CarContext);

  const isEmpty = (obj: { [key: string]: string | number }): boolean => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const formattedCardBrand = useMemo(() => {
    const formattedData = carBrand.map((brand) => {
      return {
        label: brand?.nome,
        code: brand?.codigo,
      };
    });
    return formattedData;
  }, [carBrand]);

  const formattedCardModel = useMemo(() => {
    const formattedData = carModel.map((brand) => {
      return {
        label: brand?.nome,
        code: brand?.codigo,
      };
    });
    return formattedData;
  }, [carModel]);

  const formattedCardYear = useMemo(() => {
    const formattedData = carYear.map((year) => {
      return {
        label: year?.nome,
        code: year?.codigo,
      };
    });
    return formattedData;
  }, [carYear]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      setCarBrand(response?.data);
    };
    try {
      data();
    } catch (err) {
      console.log(err);
    }
  }, [setCarBrand]);

  useEffect(() => {
    if (inputValues?.brand?.code) {
      const data = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand?.code}/modelos`
        );
        setCarModel(response?.data?.modelos);
      };
      try {
        data();
      } catch (err) {
        console.log(err);
      }
    }
  }, [inputValues?.brand, setCarModel]);

  useEffect(() => {
    if (inputValues?.model?.code && inputValues?.brand?.code) {
      const data = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand?.code}/modelos/${inputValues?.model?.code}/anos`
        );
        setCarYear(response?.data);
      };
      try {
        data();
      } catch (err) {
        console.log(err);
      }
    }
  }, [inputValues?.model, setCarYear]);

  const handleCarBrandChange = (brand: string) => {
    const carBrandObj = formattedCardBrand.filter((carBrand) => {
      return carBrand?.label === brand;
    })[0];
    setInputValues({
      brand: { label: carBrandObj?.label, code: carBrandObj?.code },
      model: { label: "", code: "" },
      year: { label: "", code: "" },
    });
    setCarModel([]);
    setCarYear([]);
  };

  const handleCarModelChange = (model: string) => {
    const carModelObj = formattedCardModel.filter((carModel) => {
      return carModel?.label === model;
    })[0];
    setInputValues({
      ...inputValues,
      model: { label: carModelObj?.label, code: carModelObj?.code },
      year: { label: "", code: "" },
    });
    setCarYear([]);
  };

  const handleCarYearChange = (year: string) => {
    const carYearObj = formattedCardYear.filter((carYear) => {
      return carYear?.label === year;
    })[0];
    setInputValues({
      ...inputValues,
      year: { label: carYearObj?.label, code: carYearObj?.code },
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    const data = async () => {
      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand?.code}/modelos/${inputValues?.model?.code}/anos/${inputValues?.year?.code}`
      );
      setCarValue(response?.data);
    };
    try {
      data();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getOptionLabel = (option: FormattedData) => {
    if (option.label) {
      return option.label;
    }
    return "";
  };
  return (
    <div className={styles.container}>
      <main
        className={`${styles.main} ${isEmpty(carValue) ? "" : styles.success}`}
      >
        {isEmpty(carValue) ? (
          <ConsultComponent
            carBrandData={formattedCardBrand}
            carModelData={formattedCardModel}
            carYearData={formattedCardYear}
            handleCarBrandChange={(e) => {
              handleCarBrandChange(e.currentTarget.innerHTML);
            }}
            handleCarModelChange={(e) => {
              handleCarModelChange(e.currentTarget.innerHTML);
            }}
            handleCarYearChange={(e) => {
              handleCarYearChange(e.currentTarget.innerHTML);
            }}
            handleSubmit={handleSubmit}
            inputValues={inputValues}
            loadingData={loading}
            getOptionLabel={getOptionLabel}
          />
        ) : (
          <SuccessComponent
            brand={carValue?.Marca}
            model={carValue?.Modelo}
            year={carValue?.AnoModelo}
            value={carValue?.Valor}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
