import { Autocomplete, Button, TextField } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Texts } from '../utils/enums'
import { Brand, InputValues, Model, Year } from '../utils/types'

const Home = (): JSX.Element => {

  const [carBrand, setCarBrand] = useState<Brand[]>([]);
  const [carModel, setCarModel] = useState<Model[]>([]);
  const [carYear, setCarYear] = useState<Year[]>([]);
  const [inputValues, setInputValues] = useState<InputValues>({
    brand: '',
    model: '',
    year: '',
  });

  const formattedCardBrand = useMemo(() => {
    const formattedData = carBrand.map((brand) => {
      return {
        label: brand?.nome,
        code: brand?.codigo
      };
    });
    return formattedData;
  }, [carBrand]);

  const formattedCardModel = useMemo(() => {
    const formattedData = carModel.map((brand) => {
      return {
        label: brand?.nome,
        code: brand?.codigo
      };
    });
    return formattedData;
  }, [carModel]);

  const formattedCardYear = useMemo(() => {
    const formattedData = carYear.map((year) => {
      return {
        label: year?.nome,
        code: year?.codigo
      };
    });
    return formattedData;
  }, [carYear]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
      setCarBrand(response?.data);
    }
    data();
  }, []);

  useEffect(() => {
    if(inputValues?.brand) {
      const data = async () => {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand}/modelos`);
        setCarModel(response?.data?.modelos);
      }
      data();
    }
  }, [inputValues.brand]);

  useEffect(() => {
    if(inputValues?.model && inputValues?.brand) {
      const data = async () => {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${inputValues?.brand}/modelos/${inputValues?.model}/anos`);
        setCarYear(response?.data);
      }
      data();
    }
  }, [inputValues.model, inputValues?.brand]);

  const handleCarBrandChange = (brand: string) => {
    const carBrandObj = formattedCardBrand.filter((carBrand) => {
      return carBrand?.label === brand;
    })[0];
    setInputValues({...inputValues, brand: carBrandObj?.code});
  };

  const handleCarModelChange = (model: string) => {
    const carModelObj = formattedCardModel.filter((carModel) => {
      return carModel?.label === model;
    })[0];
    setInputValues({...inputValues, model: carModelObj?.code});
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
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
                options={formattedCardBrand}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Marca" />}
                onChange={(e) => {
                  handleCarBrandChange(e.currentTarget.innerHTML);
                }}
              />
              <Autocomplete
                className={styles.autocomplete}
                disablePortal
                id="car-model-combo-box"
                options={formattedCardModel}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Modelo" />}
                disabled={!inputValues.brand}
                onChange={(e) => {
                  handleCarModelChange(e.currentTarget.innerHTML)
                }}
              />
              <Autocomplete
                className={styles.autocomplete}
                disablePortal
                id="car-year-combo-box"
                options={formattedCardYear}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Ano" />}
                disabled={!inputValues.model || !inputValues.brand}
                onChange={(e) => {
                  console.log(e.currentTarget.innerHTML)
                }}
              />

              <Button variant="contained" className={styles.submitBtn}>{Texts.CONSULT_PRICE}</Button>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
