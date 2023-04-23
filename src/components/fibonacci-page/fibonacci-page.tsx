import React, { useState } from "react";

import cls from "./fibonacci-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [arrayFibonacci, setArrayFibonacci] = useState<Number[]>([]);
  const { values, handleChange, setValues } = useForm({ data: "" });

  const generateFibonacci = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await delay(SHORT_DELAY_IN_MS);
    setArrayFibonacci([0]);
    await delay(SHORT_DELAY_IN_MS);
    setArrayFibonacci((arrayFibonacci) => [...arrayFibonacci, 1]);

    const rowLength = Number(values.data);
    const tempArrayFib = [0, 1];

    for (let i = 2; i < rowLength + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      let nextNumberFib = tempArrayFib[i - 2] + tempArrayFib[i - 1];
      tempArrayFib.push(nextNumberFib);
      setArrayFibonacci((arrayFibonacci) => [...arrayFibonacci, nextNumberFib]);
    }
    setValues({ data: "" });
    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={cls.form} onSubmit={(e) => generateFibonacci(e)}>
        <Input
          min={1}
          max={19}
          isLimitText
          type={"number"}
          name='data'
          value={values.data}
          onChange={handleChange}
          data-cy='input'
        />
        <Button
          text='Рассчитать'
          type='submit'
          disabled={!values.data || Number(values.data) < 0 || Number(values.data) > 19}
          isLoader={isLoading}
          style={{ minWidth: "178px" }}
          data-cy='button'
        />
      </form>
      <ul className={cls.list}>
        {arrayFibonacci.map((el, index) => {
          return (
            <li key={index}>
              <Circle letter={String(el)} tail={String(index)} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
