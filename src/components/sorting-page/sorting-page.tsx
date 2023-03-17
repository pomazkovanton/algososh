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
  });
  const [isSortedArray, setIsSortedArray] = useState(false);
  const [startIndex, setStarIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(18);
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
    setStepsCount(18);
    setRandomNumbers(randomArr());
  };

  const ascendingBubbleSort = async () => {
    setIsLoading({ ...isLoading, ascendingBtn: true });
    setIsActive({ ...isActive, descendingBtn: true, newArrayBtn: true });
    const arr = randomNumbers;
    let stepsCount = arr.length - 1;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < stepsCount; i += 1) {
        if (arr[i] > arr[i + 1]) {
          await delay(SHORT_DELAY_IN_MS);
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          setRandomNumbers(arr);
          setStarIndex(i);
          setEndIndex(i + 1);
        }
      }
      stepsCount -= 1;
    } while (swapped);
    setStarIndex(-1);
    setEndIndex(18);
    setIsActive({ ...isActive, descendingBtn: false, newArrayBtn: false });
    setIsLoading({ ...isLoading, ascendingBtn: false });
  };

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
    setStarIndex(-1);
    setEndIndex(18);
  }

  const ascendingbubbleSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, ascendingBtn: true });
    setIsActive({ ...isActive, descendingBtn: true, newArrayBtn: true });
    setIsSortedArray(false);
    const arr = randomNumbers;
    await bubbleSort(arr, method);
    setIsActive({ ...isActive, descendingBtn: false, newArrayBtn: false });
    setIsLoading({ ...isLoading, ascendingBtn: false });
    setIsSortedArray(true);
  };

  const descendingBubbleSort = async (method: TMethod) => {
    setIsLoading({ ...isLoading, descendingBtn: true });
    setIsActive({ ...isActive, ascendingBtn: true, newArrayBtn: true });
    setIsSortedArray(false);
    const arr = randomNumbers;
    await bubbleSort(arr, method);
    setIsActive({ ...isActive, ascendingBtn: false, newArrayBtn: false });
    setIsLoading({ ...isLoading, descendingBtn: false });
    setIsSortedArray(true);
  };

  const handleClickAscendingBtn = () => {
    if (radioBtnsValue.select) ascendingSelectSort();
    if (radioBtnsValue.bubble) ascendingbubbleSort("ascending");
  };

  const handleClickDescendingBtn = () => {
    if (radioBtnsValue.select) console.log("select descending");
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
          } else if (index > stepsCount) {
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
