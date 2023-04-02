import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import cls from "./list-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
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
  const [stepProgress, setStepProgress] = useState(-1);
  const [isRemoved, setIsRemoved] = useState(false);
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
  const [colorCircle, setColorCircle] = useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
    byPosition: ElementStates.Default,
  });
  const list = useRef() as MutableRefObject<LinkedList<string>>;

  useEffect(() => {
    list.current = new LinkedList<string>();
    list.current.fromArray(initValueList);
    setLinkedList(getValuesList(list));
  }, []);

  const changeColorCircle = async (ms: number, part: "head" | "tail" | "byPosition") => {
    setColorCircle({ ...colorCircle, [part]: ElementStates.Modified });
    await delay(ms);
    setColorCircle({ ...colorCircle, [part]: ElementStates.Default });
  };

  const getValuesList = (list: React.MutableRefObject<LinkedList<string>>): string[] => {
    const listNodes = list.current.toArray();
    const arrayListValues: string[] = [];
    listNodes.forEach((el) => arrayListValues.push(el.data));
    return arrayListValues;
  };

  const addToHead = async () => {
    if (list.current.getSize() >= 7) return alert("Превышен лимит списка!");
    if (list.current.getSize() === 0) setLinkedList([""]);
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
    await changeColorCircle(SHORT_DELAY_IN_MS, HEAD);
    setValuesInput({ index: "", data: "" });
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
    if (list.current.getSize() === 0) setLinkedList([""]);
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
    await changeColorCircle(SHORT_DELAY_IN_MS, TAIL);
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

  const removeFromTail = async () => {
    setIsLoading({ ...isLoading, removeFromTailBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: true,
      addInHeadBtn: true,
      removeFromHeadBtn: true,
      addByIndexBtn: true,
      removeByIndexBtn: true,
    });
    setStatus("remove-from-tail");
    await delay(SHORT_DELAY_IN_MS);
    setStatus(null);
    list.current.deleteTail();
    setLinkedList(getValuesList(list));
    setIsLoading({ ...isLoading, removeFromTailBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: false,
      addInHeadBtn: false,
      removeFromHeadBtn: false,
      addByIndexBtn: false,
      removeByIndexBtn: false,
    });
  };

  const addByIndex = async () => {
    if (list.current.getSize() <= Number(valuesInput.index)) {
      setValuesInput({ ...valuesInput, index: "" });
      return alert("Такого индекса нет в списке");
    }
    if (Number(valuesInput.index) === 0) return addToHead();
    setIsLoading({ ...isLoading, addByIndexBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: true,
      addInHeadBtn: true,
      removeFromHeadBtn: true,
      removeFromTailBtn: true,
      removeByIndexBtn: true,
    });
    setStatus("add-by-index");
    await renderProgress();
    setStatus(null);
    list.current.insertInPosition(Number(valuesInput.index), valuesInput.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, "byPosition");
    setValuesInput({ index: "", data: "" });
    setStepProgress(-1);
    setIsLoading({ ...isLoading, addByIndexBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: false,
      addInHeadBtn: false,
      removeFromHeadBtn: false,
      removeFromTailBtn: false,
      removeByIndexBtn: false,
    });
  };

  const removeByIndex = async () => {
    if (list.current.getSize() <= Number(valuesInput.index)) {
      setValuesInput({ ...valuesInput, index: "" });
      return alert("Такого индекса нет в списке");
    }
    setIsLoading({ ...isLoading, removeByIndexBtn: true });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: true,
      addInHeadBtn: true,
      removeFromHeadBtn: true,
      removeFromTailBtn: true,
      addByIndexBtn: true,
    });
    setStatus("remove-by-index");
    await renderProgress();
    setIsRemoved(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsRemoved(false);
    list.current.removeByPosition(Number(valuesInput.index));
    setLinkedList(getValuesList(list));
    setStatus(null);
    setValuesInput({ ...valuesInput, index: "" });
    setStepProgress(-1);
    setIsLoading({ ...isLoading, removeByIndexBtn: false });
    setIsDisabled({
      ...isDisabled,
      addInTailBtn: false,
      addInHeadBtn: false,
      removeFromHeadBtn: false,
      removeFromTailBtn: false,
      addByIndexBtn: false,
    });
  };

  const renderProgress = async () => {
    let step = -1;
    while (step < +valuesInput.index) {
      await delay(SHORT_DELAY_IN_MS);
      step++;
      setStepProgress(step);
    }
  };

  const headRenderingCondition = (indexItem: number, status: TListStatus) => {
    const CIRCLE = <Circle isSmall={true} letter={valuesInput.data} state={ElementStates.Changing} />;
    switch (status) {
      case "add-in-head":
        if (list.current.getSize() <= 1) return CIRCLE;
        if (indexItem === 0) return CIRCLE;
        break;
      case "add-in-tail":
        if (list.current.getSize() <= 1) return CIRCLE;
        if (indexItem === 0) return HEAD;
        if (indexItem === linkedList.length - 1) return CIRCLE;
        break;
      case "add-by-index":
        if (indexItem === stepProgress) return CIRCLE;
        if (indexItem === 0) return HEAD;
        break;
      default:
        if (indexItem === 0) return HEAD;
        return "";
    }
  };

  const tailRenderingCondition = (indexItem: number, status: TListStatus, el: string) => {
    const CIRCLE = <Circle isSmall={true} letter={el} state={ElementStates.Changing} />;
    switch (status) {
      case "remove-from-head":
        if (list.current.getSize() <= 1) return CIRCLE;
        if (indexItem === linkedList.length - 1) return TAIL;
        if (indexItem === 0) return CIRCLE;
        break;
      case "remove-from-tail":
        if (list.current.getSize() <= 1) return CIRCLE;
        if (indexItem === linkedList.length - 1) return CIRCLE;
        break;
      case "remove-by-index":
        if (indexItem === Number(valuesInput.index) && isRemoved) return CIRCLE;
        if (indexItem === linkedList.length - 1) return TAIL;
        break;
      default:
        if (indexItem === linkedList.length - 1) return TAIL;
        return "";
    }
  };

  const letterRenderingCondition = (indexItem: number, status: TListStatus, el: string) => {
    switch (status) {
      case "remove-from-head":
        if (indexItem === 0) return "";
        return el;
      case "remove-from-tail":
        if (indexItem === linkedList.length - 1) return "";
        return el;
      case "remove-by-index":
        if (indexItem === Number(valuesInput.index) && isRemoved) return "";
        return el;
      default:
        return el;
    }
  };

  const colorRenderingCondition = (indexItem: number, status: TListStatus) => {
    switch (status) {
      case "add-by-index":
        if (indexItem < stepProgress + 1) return ElementStates.Changing;
        break;
      case "remove-by-index":
        if (indexItem <= stepProgress) return ElementStates.Changing;
        break;
      default:
        if (indexItem === stepProgress) return colorCircle.byPosition;
        if (indexItem === 0) return colorCircle.head;
        if (indexItem === linkedList.length - 1) return colorCircle.tail;
        return ElementStates.Default;
    }
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
          onClick={removeFromTail}
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
          disabled={
            isDisabled.addByIndexBtn ||
            valuesInput.data === "" ||
            valuesInput.index === "" ||
            Number(valuesInput.index) > linkedList.length - 1 ||
            Number(valuesInput.index) < 0
          }
          isLoader={isLoading.addByIndexBtn}
          onClick={addByIndex}
        />
        <Button
          text='Удалить по индексу'
          style={{ minWidth: "362px" }}
          disabled={
            isDisabled.removeByIndexBtn ||
            valuesInput.index === "" ||
            Number(valuesInput.index) > linkedList.length - 1 ||
            Number(valuesInput.index) < 0
          }
          isLoader={isLoading.removeByIndexBtn}
          onClick={removeByIndex}
        />
      </div>
      <ul className={cls.list}>
        {linkedList.map((el, index) => {
          return (
            <div className={cls.item} key={index}>
              {
                <Circle
                  letter={letterRenderingCondition(index, status, el)}
                  index={index}
                  state={colorRenderingCondition(index, status)}
                  tail={tailRenderingCondition(index, status, el)}
                  head={headRenderingCondition(index, status)}
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
