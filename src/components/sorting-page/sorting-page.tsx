import React, { useState } from "react";
import cls from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [randomNumbers, setRandomNumbers] = useState([
    12, 3, 14, 67, 3, 2, 45, 12, 3, 14, 67, 3, 2, 45, 3, 2, 45,
  ]);
  const [radioBtnsValue, setRadioSelect] = useState({
    select: true,
    bubble: false,
  });

  const changeSelectButton = () => {
    setRadioSelect({ select: true, bubble: false });
  };

  const changeBubbleButton = () => {
    setRadioSelect({ select: false, bubble: true });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={cls.header}>
        <ul className={`${cls.list} ${cls["list-radio"]}`}>
          <li>
            <RadioInput
              label="Выбор"
              name="type"
              value="selection"
              onChange={changeSelectButton}
              checked={radioBtnsValue.select}
            />
          </li>
          <li>
            <RadioInput
              label="Пузырёк"
              name="type"
              value="bubble"
              onChange={changeBubbleButton}
              checked={radioBtnsValue.bubble}
            />
          </li>
        </ul>
        <ul className={`${cls.list} ${cls["list-button"]}`}>
          <li>
            <ul className={cls.list}>
              <li>
                <Button
                  text="По возрастанию"
                  sorting={Direction.Ascending}
                  style={{ minWidth: "205px" }}
                  onClick={() => console.log("Click")}
                />
              </li>
              <li>
                <Button
                  text="По убыванию"
                  sorting={Direction.Descending}
                  style={{ minWidth: "205px" }}
                  onClick={() => console.log("Click")}
                />
              </li>
            </ul>
          </li>
          <li>
            <Button
              text="Новый массив"
              style={{ minWidth: "205px" }}
              onClick={() => console.log("Click")}
            />
          </li>
        </ul>
      </div>
      <div className={cls.main}>
        {randomNumbers.map((num, index) => {
          return (
            <Column key={index} index={num} state={ElementStates.Default} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
