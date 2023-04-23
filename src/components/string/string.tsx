import React, { useState } from "react";

import cls from "./string.module.css";

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  const [arrChars, setArrChars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [startIndex, setStarIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(12);
  const { values, handleChange, setValues } = useForm({ data: "" });

  const reverseString = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsReverse(false);
    setIsLoading(true);

    const tempArray = values.data.split("");
    const lengthArray = tempArray.length;
    await delay(SHORT_DELAY_IN_MS);

    for (let i = 0; i < lengthArray / 2; i++) {
      const startIndex = i;
      const endIndex = lengthArray - i - 1;

      setArrChars(tempArray);
      setStarIndex(startIndex);
      setEndIndex(endIndex);

      await delay(DELAY_IN_MS);

      const tmp = tempArray[startIndex];
      tempArray[startIndex] = tempArray[endIndex];
      tempArray[endIndex] = tmp;
    }

    setStarIndex(-1);
    setEndIndex(12);
    setArrChars(tempArray);
    setValues({ data: "" });
    setIsLoading(false);
    setIsReverse(true);
  };

  return (
    <SolutionLayout title='Строка'>
      <form className={cls.form} onSubmit={(e) => reverseString(e)}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={values.data}
          onChange={handleChange}
          name='data'
          data-cy='input'
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={!values.data}
          isLoader={isLoading}
          style={{ minWidth: "178px" }}
          data-cy='button'
        />
      </form>
      <ul className={cls.list}>
        {arrChars.map((char, index) => {
          if (index === startIndex || index === endIndex) {
            return (
              <li key={index}>
                <Circle letter={char} state={ElementStates.Changing} />
              </li>
            );
          } else if (index < startIndex || index > endIndex || isReverse) {
            return (
              <li key={index}>
                <Circle letter={char} state={ElementStates.Modified} />
              </li>
            );
          } else if (index > startIndex || index < endIndex) {
            return (
              <li key={index}>
                <Circle letter={char} />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </SolutionLayout>
  );
};
