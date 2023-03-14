import React, { useState } from "react";
import clc from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState("");

  const reverseString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueInput);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={clc.form} onSubmit={(e) => reverseString(e)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(e) => setValueInput(e.currentTarget.value)}
        />
        <Button text="Развернуть" type="submit" disabled={valueInput === ""} />
      </form>
    </SolutionLayout>
  );
};
