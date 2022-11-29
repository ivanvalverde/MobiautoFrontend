import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import ConsultComponent from "../components/ConsultComponent";
import { CarContext } from "../components/context";
import SuccessComponent from "../components/SuccessComponent";
import styles from "../styles/Home.module.css";

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
    data();
  }, [setCarBrand]);

  useEffect(() => {
    if (inputValues?.brand) {
      const data = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand}/modelos`
        );
        setCarModel(response?.data?.modelos);
      };
      data();
    }
  }, [inputValues?.brand, setCarModel]);

  useEffect(() => {
    if (inputValues?.model && inputValues?.brand) {
      const data = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand}/modelos/${inputValues?.model}/anos`
        );
        setCarYear(response?.data);
      };
      data();
    }
  }, [inputValues?.model, inputValues?.brand, setCarYear]);

  const handleCarBrandChange = (brand: string) => {
    const carBrandObj = formattedCardBrand.filter((carBrand) => {
      return carBrand?.label === brand;
    })[0];
    setInputValues({ ...inputValues, brand: carBrandObj?.code });
  };

  const handleCarModelChange = (model: string) => {
    const carModelObj = formattedCardModel.filter((carModel) => {
      return carModel?.label === model;
    })[0];
    setInputValues({ ...inputValues, model: carModelObj?.code });
  };

  const handleCarYearChange = (year: string) => {
    const carYearObj = formattedCardYear.filter((carYear) => {
      return carYear?.label === year;
    })[0];
    setInputValues({ ...inputValues, year: carYearObj?.code });
  };

  const handleSubmit = () => {
    const data = async () => {
      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand}/modelos/${inputValues?.model}/anos/${inputValues?.year}`
      );
      setCarValue(response?.data);
    };
    data();
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
