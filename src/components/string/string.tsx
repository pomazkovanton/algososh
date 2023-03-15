import React, { useState } from "react";
import cls from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [arrChars, setArrChars] = useState<string[]>([]);
  const [isReverseString, setIsReverseString] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reverseString = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReverseString(false);
    setIsLoading(true);
    setArrChars(valueInput.split(""));

    const tempArray = valueInput.split("");
    const lengthArray = tempArray.length;

    for (let i = 0; i < lengthArray / 2; i++) {
      const tmp = tempArray[i];
      tempArray[i] = tempArray[lengthArray - i - 1];
      tempArray[lengthArray - i - 1] = tmp;
    }

    setArrChars(tempArray);
    setValueInput(tempArray.join(""));
    setIsReverseString(true);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={cls.form} onSubmit={(e) => reverseString(e)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(e) => setValueInput(e.currentTarget.value)}
        />
        <Button
          text="Развернуть"
          type="submit"
          disabled={!valueInput}
          isLoader={isLoading}
        />
      </form>
      <ul className={cls.list}>
        {isReverseString &&
          arrChars &&
          arrChars.map((char, index) => {
            return (
              <li key={index}>
                <Circle letter={char} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
