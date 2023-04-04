import { useState } from "react";

type useFormHook<T> = {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

export const useForm = <T>(inputValues: T): useFormHook<T> => {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};
