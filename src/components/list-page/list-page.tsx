import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import cls from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "../../utils/linked-list";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

const initValueList = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [indexInput, setIndexInput] = useState<string>("");
  const [linkedList, setLinkedList] = useState<string[]>([]);
  const list = useRef() as MutableRefObject<LinkedList<string>>;

  useEffect(() => {
    list.current = new LinkedList<string>();
    list.current.fromArray(initValueList);

    const listNodes = list.current.toArray();
    const arrayListValues: string[] = [];
    listNodes.forEach((el) => arrayListValues.push(el.data));

    setLinkedList(arrayListValues);
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={cls.header}>
        <Input
          maxLength={4}
          isLimitText
          placeholder={"Введите значение"}
          style={{ minWidth: "204px" }}
          value={valueInput}
          onChange={(e) => setValueInput(e.currentTarget.value)}
        />
        <Button text="Добавить в head" style={{ minWidth: "175px" }} />
        <Button text="Добавить в tail" style={{ minWidth: "175px" }} />
        <Button text="Удалить из head" style={{ minWidth: "175px" }} />
        <Button text="Удалить из tail" style={{ minWidth: "175px" }} />
        <Input
          min={0}
          max={10}
          maxLength={2}
          type="number"
          value={indexInput}
          style={{ minWidth: "204px" }}
          placeholder={"Введите индекс"}
          onChange={(e) => setIndexInput(e.currentTarget.value)}
        />
        <Button text="Добавить по индексу" style={{ minWidth: "362px" }} />
        <Button text="Удалить по индексу" style={{ minWidth: "362px" }} />
      </div>
      <ul className={cls.list}>
        {linkedList.map((el, index) => {
          return (
            <div className={cls.item}>
              <Circle
                letter={el}
                index={index}
                state={ElementStates.Default}
                tail={index === linkedList.length - 1 ? "tail" : ""}
                head={index === 0 ? "head" : ""}
              />
              {linkedList.length > 1 && index !== linkedList.length - 1 && (
                <ArrowIcon />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
