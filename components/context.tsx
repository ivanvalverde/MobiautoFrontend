import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Brand, CarValue, InputValues, Model, Year } from "../utils/types";

type ICarProviderProps = {
    children: JSX.Element;
};
  
  interface ICarContextProps {
    carBrand: Brand[];
    setCarBrand: Dispatch<SetStateAction<Brand[]>>;
    carModel: Model[];
    setCarModel:  Dispatch<SetStateAction<Model[]>>;
    carYear: Year[];
    setCarYear: Dispatch<SetStateAction<Brand[]>>;
    carValue: CarValue;
    setCarValue: Dispatch<SetStateAction<CarValue>>;
    inputValues: InputValues;
    setInputValues: Dispatch<SetStateAction<InputValues>>;
  }
  
  const CarContext = createContext<ICarContextProps>({} as ICarContextProps);
  
  const CarProvider = ({ children }: ICarProviderProps): JSX.Element => {
    const [carBrand, setCarBrand] = useState<Brand[]>([]);
    const [carModel, setCarModel] = useState<Model[]>([]);
    const [carYear, setCarYear] = useState<Year[]>([]);
    const [carValue, setCarValue] = useState<CarValue>({} as CarValue);
    const [inputValues, setInputValues] = useState<InputValues>({
        brand: "",
        model: "",
        year: "",
      });
  
    return (
      <CarContext.Provider
        value={{
          carBrand,
          carModel,
          carValue,
          carYear,
          inputValues,
          setCarBrand,
          setCarModel,
          setCarValue,
          setCarYear,
          setInputValues
        }}
      >
        {children}
      </CarContext.Provider>
    );
  };
  
  export { CarContext, CarProvider };