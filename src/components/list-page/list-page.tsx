import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import cls from "./list-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TListStatus } from "../../types/utils";
import { LinkedList } from "../../utils/linked-list";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const initValueList = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const [valuesInput, setValuesInput] = useState({ data: "", index: "" });
  const [linkedList, setLinkedList] = useState<string[]>([]);
  const [status, setStatus] = useState<TListStatus>(null);
  const [isLoading, setIsLoading] = useState({
    addInHeadBtn: false,
    addInTailBtn: false,
    removeFromHeadBtn: false,
    removeFromTailBtn: false,
    addByIndexBtn: false,
    removeByIndexBtn: false,
  });
  const [isDisabled, setIsDisabled] = useState({
    addInHeadBtn: false,
    addInTailBtn: false,
    removeFromHeadBtn: false,
    removeFromTailBtn: false,
    addByIndexBtn: false,
    removeByIndexBtn: false,
  });
  const [colorCircle, setColorCircle] = useState({ head: ElementStates.Default, tail: ElementStates.Default });
  const list = useRef() as MutableRefObject<LinkedList<string>>;

  useEffect(() => {
    list.current = new LinkedList<string>();
    list.current.fromArray(initValueList);
    setLinkedList(getValuesList(list));
  }, []);

  const changeColorCircle = async (ms: number, part: "head" | "tail") => {
    if (part === "head") {
      setColorCircle({ ...colorCircle, head: ElementStates.Modified });
      await delay(ms);
      setColorCircle({ ...colorCircle, head: ElementStates.Default });
    } else {
      setColorCircle({ ...colorCircle, tail: ElementStates.Modified });
      await delay(ms);
      setColorCircle({ ...colorCircle, tail: ElementStates.Default });
    }
  };

  const getValuesList = (list: React.MutableRefObject<LinkedList<string>>): string[] => {
    const listNodes = list.current.toArray();
    const arrayListValues: string[] = [];
    listNodes.forEach((el) => arrayListValues.push(el.data));
    return arrayListValues;
  };

  const addToHead = async () => {
    if (list.current.getSize() >= 7) return alert("Превышен лимит списка!");
    setIsLoading({ ...isLoading, addInHeadBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: true,
      removeFromHeadBtn: true,
      removeFromTailBtn: true,
      addByIndexBtn: true,
      removeByIndexBtn: true,
    });
    setStatus("add-in-head");
    await delay(SHORT_DELAY_IN_MS);
    setStatus(null);
    list.current.prepend(valuesInput.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, "head");
    setValuesInput({ ...valuesInput, data: "" });
    setIsLoading({ ...isLoading, addInHeadBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: false,
      removeFromHeadBtn: false,
      removeFromTailBtn: false,
      addByIndexBtn: false,
      removeByIndexBtn: false,
    });
  };

  const addToTail = async () => {
    if (list.current.getSize() >= 7) return alert("Превышен лимит списка!");
    setIsLoading({ ...isLoading, addInTailBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInHeadBtn: true,
      removeFromHeadBtn: true,
      removeFromTailBtn: true,
      addByIndexBtn: true,
      removeByIndexBtn: true,
    });
    setStatus("add-in-tail");
    await delay(SHORT_DELAY_IN_MS);
    setStatus(null);
    list.current.append(valuesInput.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, "tail");
    setValuesInput({ ...valuesInput, data: "" });
    setIsLoading({ ...isLoading, addInTailBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInHeadBtn: false,
      removeFromHeadBtn: false,
      removeFromTailBtn: false,
      addByIndexBtn: false,
      removeByIndexBtn: false,
    });
  };

  const removeFromHead = async () => {
    setIsLoading({ ...isLoading, removeFromHeadBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: true,
      addInHeadBtn: true,
      removeFromTailBtn: true,
      addByIndexBtn: true,
      removeByIndexBtn: true,
    });
    setStatus("remove-from-head");
    await delay(SHORT_DELAY_IN_MS);
    setStatus(null);
    list.current.deleteHead();
    setLinkedList(getValuesList(list));
    setIsLoading({ ...isLoading, removeFromHeadBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: false,
      addInHeadBtn: false,
      removeFromTailBtn: false,
      addByIndexBtn: false,
      removeByIndexBtn: false,
    });
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={cls.header}>
        <Input
          maxLength={4}
          isLimitText
          placeholder={"Введите значение"}
          style={{ minWidth: "204px" }}
          value={valuesInput.data}
          onChange={(e) => setValuesInput({ ...valuesInput, data: e.currentTarget.value })}
        />
        <Button
          text='Добавить в head'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.addInHeadBtn || valuesInput.data === ""}
          isLoader={isLoading.addInHeadBtn}
          onClick={addToHead}
        />
        <Button
          text='Добавить в tail'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.addInTailBtn || valuesInput.data === ""}
          isLoader={isLoading.addInTailBtn}
          onClick={addToTail}
        />
        <Button
          text='Удалить из head'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.removeFromHeadBtn || linkedList.length === 0}
          isLoader={isLoading.removeFromHeadBtn}
          onClick={removeFromHead}
        />
        <Button
          text='Удалить из tail'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.removeFromTailBtn || linkedList.length === 0}
          isLoader={isLoading.removeFromTailBtn}
        />
        <Input
          min={0}
          max={10}
          maxLength={2}
          type='number'
          value={valuesInput.index}
          style={{ minWidth: "204px" }}
          placeholder={"Введите индекс"}
          onChange={(e) => setValuesInput({ ...valuesInput, index: e.currentTarget.value })}
        />
        <Button
          text='Добавить по индексу'
          style={{ minWidth: "362px" }}
          disabled={isDisabled.addByIndexBtn || valuesInput.data === "" || valuesInput.index === ""}
          isLoader={isLoading.addByIndexBtn}
        />
        <Button
          text='Удалить по индексу'
          style={{ minWidth: "362px" }}
          disabled={isDisabled.removeByIndexBtn || valuesInput.index === ""}
          isLoader={isLoading.removeByIndexBtn}
        />
      </div>
      <ul className={cls.list}>
        {linkedList.map((el, index) => {
          return (
            <div className={cls.item} key={index}>
              {
                <Circle
                  letter={status === "remove-from-head" && index === 0 ? "" : el}
                  index={index}
                  state={
                    index === 0
                      ? colorCircle.head
                      : index === linkedList.length - 1
                      ? colorCircle.tail
                      : ElementStates.Default
                  }
                  tail={
                    index === linkedList.length - 1 ? (
                      "tail"
                    ) : "" || (index === 0 && status === "remove-from-head") ? (
                      <Circle isSmall={true} letter={el} state={ElementStates.Changing} />
                    ) : (
                      ""
                    )
                  }
                  head={
                    (status === "add-in-head" && index === 0) ||
                    (status === "add-in-tail" && index === linkedList.length - 1) ? (
                      <Circle isSmall={true} letter={valuesInput.data} state={ElementStates.Changing} />
                    ) : index === 0 ? (
                      "head"
                    ) : (
                      ""
                    )
                  }
                />
              }
              {linkedList.length > 1 && index !== linkedList.length - 1 && <ArrowIcon />}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
