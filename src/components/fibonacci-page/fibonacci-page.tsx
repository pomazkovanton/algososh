import React, { useState } from "react";

import cls from "./fibonacci-page.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [arrayFibonacci, setArrayFibonacci] = useState([
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ]);
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={cls.form} onSubmit={(e) => console.log(e)}>
        <Input
          min={1}
          max={19}
          isLimitText
          type={"number"}
          value={valueInput}
          onChange={(e) => setValueInput(e.currentTarget.value)}
        />
        <Button
          text="Рассчитать"
          type="submit"
          disabled={!valueInput}
          isLoader={isLoading}
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
