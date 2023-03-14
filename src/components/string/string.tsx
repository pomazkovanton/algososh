import React, { useState } from "react";
import cls from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState<null | string>(null);
  const [arrChars, setArrChars] = useState<null | string[]>(null);

  const reverseString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    valueInput && setArrChars(valueInput?.split(""));
  };

  return (
    <SolutionLayout title="Строка">
      <form className={cls.form} onSubmit={(e) => reverseString(e)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(e) => setValueInput(e.currentTarget.value)}
        />
        <Button text="Развернуть" type="submit" disabled={!valueInput} />
      </form>
      <ul className={cls.list}>
        {arrChars &&
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
