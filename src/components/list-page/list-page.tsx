import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import cls from "./list-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
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

type TInputsData = {
  data: string;
  index: string;
};

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm<TInputsData>({ data: "", index: "" });
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
    list.current.prepend(values.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, HEAD);
    setValues({ index: "", data: "" });
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
    list.current.append(values.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, TAIL);
    setValues({ ...values, data: "" });
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
    if (list.current.getSize() <= Number(values.index)) {
      setValues({ ...values, index: "" });
      return alert("Такого индекса нет в списке");
    }
    if (Number(values.index) === 0) return addToHead();
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
    list.current.insertInPosition(Number(values.index), values.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS, "byPosition");
    setValues({ index: "", data: "" });
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
    if (list.current.getSize() <= Number(values.index)) {
      setValues({ ...values, index: "" });
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
    list.current.removeByPosition(Number(values.index));
    setLinkedList(getValuesList(list));
    setStatus(null);
    setValues({ ...values, index: "" });
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
    while (step < +values.index) {
      await delay(SHORT_DELAY_IN_MS);
      step++;
      setStepProgress(step);
    }
  };

  const headRenderingCondition = (indexItem: number, status: TListStatus) => {
    const CIRCLE = <Circle isSmall={true} letter={values.data} state={ElementStates.Changing} />;
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
        if (indexItem === Number(values.index) && isRemoved) return CIRCLE;
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
        if (indexItem === Number(values.index) && isRemoved) return "";
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
          value={values.data}
          onChange={handleChange}
          name='data'
          data-cy='input-value'
        />
        <Button
          text='Добавить в head'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.addInHeadBtn || values.data === ""}
          isLoader={isLoading.addInHeadBtn}
          onClick={addToHead}
          data-cy='button-add-in-head'
        />
        <Button
          text='Добавить в tail'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.addInTailBtn || values.data === ""}
          isLoader={isLoading.addInTailBtn}
          onClick={addToTail}
          data-cy='button-add-in-tail'
        />
        <Button
          text='Удалить из head'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.removeFromHeadBtn || linkedList.length === 0}
          isLoader={isLoading.removeFromHeadBtn}
          onClick={removeFromHead}
          data-cy='button-del-from-head'
        />
        <Button
          text='Удалить из tail'
          style={{ minWidth: "175px" }}
          disabled={isDisabled.removeFromTailBtn || linkedList.length === 0}
          isLoader={isLoading.removeFromTailBtn}
          onClick={removeFromTail}
          data-cy='button-del-from-tail'
        />
        <Input
          min={0}
          max={10}
          maxLength={2}
          type='number'
          value={values.index}
          style={{ minWidth: "204px" }}
          placeholder={"Введите индекс"}
          onChange={handleChange}
          name='index'
          data-cy='input-index'
        />
        <Button
          text='Добавить по индексу'
          style={{ minWidth: "362px" }}
          disabled={
            isDisabled.addByIndexBtn ||
            values.data === "" ||
            values.index === "" ||
            Number(values.index) > linkedList.length - 1 ||
            Number(values.index) < 0
          }
          isLoader={isLoading.addByIndexBtn}
          onClick={addByIndex}
          data-cy='button-add-by-index'
        />
        <Button
          text='Удалить по индексу'
          style={{ minWidth: "362px" }}
          disabled={
            isDisabled.removeByIndexBtn ||
            values.index === "" ||
            Number(values.index) > linkedList.length - 1 ||
            Number(values.index) < 0
          }
          isLoader={isLoading.removeByIndexBtn}
          onClick={removeByIndex}
          data-cy='button-del-by-index'
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
