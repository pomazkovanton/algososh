import React, { useEffect, useState } from "react";
import cls from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay, randomArr } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TMethod } from "../../types/utils";

export const SortingPage: React.FC = () => {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState({
    newArrayBtn: false,
    ascendingBtn: false,
    descendingBtn: false,
  });
  const [isActive, setIsActive] = useState({
    newArrayBtn: false,
    ascendingBtn: false,
    descendingBtn: false,
    bubbleRadioBtn: false,
    selectRadioBtn: false,
  });
  const [isSortedArray, setIsSortedArray] = useState(false);
  const [startIndex, setStarIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  const [stepsCount, setStepsCount] = useState(18)
  const [radioBtnsValue, setRadioSelect] = useState({
    select: true,
    bubble: false,
  });

  useEffect(() => {
    randomNewArray();
  }, []);

  const changeSelectButton = () => {
    setRadioSelect({ select: true, bubble: false });
  };

  const changeBubbleButton = () => {
    setRadioSelect({ select: false, bubble: true });
  };

  const randomNewArray = () => {
    setIsSortedArray(false);
    setEndIndex(null);
    setStarIndex(null);
    setStepsCount(18);
    setRandomNumbers(randomArr());
    
  };

  const selectorSort  = async (arr: number[], method: TMethod) => {
    for (let i = 0; i < arr.length; i++) {
      let indexMin = i;
      for (let j = i; j < arr.length; j++) {
        if (method === "ascending" ? arr[indexMin] > arr[j] : arr[indexMin] < arr[j]) {
          await delay(SHORT_DELAY_IN_MS);
          [arr[j], arr[indexMin]] = [arr[indexMin], arr[j]];
          setRandomNumbers(arr);
          setStarIndex(j);
          setEndIndex(indexMin);
        }
      }
    }
    setStarIndex(null);
    setEndIndex(18);
    setStepsCount(-1)
  }

  const bubbleSort = async (arr: number[], method: TMethod) => {
    let steps = arr.length;
    for (let j = 0; j < arr.length; j++) {
      steps--;
      for (let i = 0; i < arr.length - 1 - j; i++) {
        await delay(SHORT_DELAY_IN_MS);
        if (method === "ascending" ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
        setRandomNumbers(arr);
        setStepsCount(steps);
        setStarIndex(i);
        setEndIndex(i + 1);
      }
    }
    setStarIndex(null);
    setEndIndex(null);
  }

  const ascendingSelectSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, ascendingBtn: true });
    setIsActive({ ...isActive, descendingBtn: true, newArrayBtn: true, bubbleRadioBtn: true });
    const arr = randomNumbers;
    await selectorSort(arr, method);
    setIsActive({ ...isActive, descendingBtn: false, newArrayBtn: false, bubbleRadioBtn: false });
    setIsLoading({ ...isLoading, ascendingBtn: false });
  };

  const descendingSelectSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, descendingBtn: true });
    setIsActive({ ...isActive, ascendingBtn: true, newArrayBtn: true, bubbleRadioBtn: true });
    const arr = randomNumbers;
    await selectorSort(arr, method);
    setIsActive({ ...isActive, ascendingBtn: false, newArrayBtn: false, bubbleRadioBtn: false });
    setIsLoading({ ...isLoading, descendingBtn: false });
  };

  const ascendingbubbleSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, ascendingBtn: true });
    setIsActive({ ...isActive, descendingBtn: true, newArrayBtn: true, selectRadioBtn: true });
    setIsSortedArray(false);
    const arr = randomNumbers;
    await bubbleSort(arr, method);
    setIsActive({ ...isActive, descendingBtn: false, newArrayBtn: false, selectRadioBtn: false });
    setIsLoading({ ...isLoading, ascendingBtn: false });
    setIsSortedArray(true);
  };

  const descendingBubbleSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, descendingBtn: true });
    setIsActive({ ...isActive, ascendingBtn: true, newArrayBtn: true, selectRadioBtn: true });
    setIsSortedArray(false);
    const arr = randomNumbers;
    await bubbleSort(arr, method);
    setIsActive({ ...isActive, ascendingBtn: false, newArrayBtn: false, selectRadioBtn: false  });
    setIsLoading({ ...isLoading, descendingBtn: false });
    setIsSortedArray(true);
  };

  const handleClickAscendingBtn = () => {
    if (radioBtnsValue.select) ascendingSelectSort("ascending");
    if (radioBtnsValue.bubble) ascendingbubbleSort("ascending");
  };

  const handleClickDescendingBtn = () => {
    if (radioBtnsValue.select) descendingSelectSort("descending");
    if (radioBtnsValue.bubble) descendingBubbleSort("descending");
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
              disabled={isActive.selectRadioBtn}
              onChange={changeSelectButton}
              checked={radioBtnsValue.select}
            />
          </li>
          <li>
            <RadioInput
              label="Пузырёк"
              name="type"
              value="bubble"
              disabled={isActive.bubbleRadioBtn}
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
                  isLoader={isLoading.ascendingBtn}
                  disabled={isActive.ascendingBtn}
                  onClick={handleClickAscendingBtn}
                />
              </li>
              <li>
                <Button
                  text="По убыванию"
                  sorting={Direction.Descending}
                  style={{ minWidth: "205px" }}
                  isLoader={isLoading.descendingBtn}
                  disabled={isActive.descendingBtn}
                  onClick={handleClickDescendingBtn}
                />
              </li>
            </ul>
          </li>
          <li>
            <Button
              text="Новый массив"
              style={{ minWidth: "205px" }}
              isLoader={isLoading.newArrayBtn}
              disabled={isActive.newArrayBtn}
              onClick={randomNewArray}
            />
          </li>
        </ul>
      </div>
      <div className={cls.main}>
        {
         isSortedArray && randomNumbers.map((num, index) => {
          return (
            <Column key={index} index={num} state={ElementStates.Modified} />
          );
         })
        }
        {!isSortedArray && randomNumbers.map((num, index) => {
          if (index === startIndex || index === endIndex) {
            return (
              <Column key={index} index={num} state={ElementStates.Changing} />
            );
          } else if ((radioBtnsValue.bubble && index > stepsCount) || (endIndex && radioBtnsValue.select && index < endIndex)) {
            return (
              <Column key={index} index={num} state={ElementStates.Modified} />
            );
          } else {
            return (
              <Column key={index} index={num} state={ElementStates.Default} />
            );
          }
        })}
      </div>
    </SolutionLayout>
  );
};
