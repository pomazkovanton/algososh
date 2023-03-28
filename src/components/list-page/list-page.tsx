import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import cls from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "../../utils/linked-list";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TListStatus } from "../../types/utils";

const initValueList = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const [valuesInput, setValuesInput] = useState({data: "", index: ""});
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
  const [colorCircle, setColorCircle] = useState(ElementStates.Default);
  const list = useRef() as MutableRefObject<LinkedList<string>>;

  useEffect(() => {
    list.current = new LinkedList<string>();
    list.current.fromArray(initValueList);
    setLinkedList(getValuesList(list));
  }, []);

  const changeColorCircle = async (ms: number) => {
    setColorCircle(ElementStates.Modified);
    await delay(ms);
    setColorCircle(ElementStates.Default);
  };

  const getValuesList = (
    list: React.MutableRefObject<LinkedList<string>>
  ): string[] => {
    const listNodes = list.current.toArray();
    const arrayListValues: string[] = [];
    listNodes.forEach((el) => arrayListValues.push(el.data));
    return arrayListValues;
  };

  const addToHead = async () => {
    if (list.current.getSize() >= 7) return alert("Превышен лимит списка!")
    setIsLoading({...isLoading, addInHeadBtn: true});
    setIsDisabled({...isDisabled, 
      addInTailBtn: true,
      removeFromHeadBtn: true,
      removeFromTailBtn: true,
      addByIndexBtn: true,
      removeByIndexBtn: true,})
    setStatus("add-in-head");
    await delay(SHORT_DELAY_IN_MS);
    setStatus(null);
    list.current.prepend(valuesInput.data);
    setLinkedList(getValuesList(list));
    await changeColorCircle(SHORT_DELAY_IN_MS);
    setValuesInput({...valuesInput, data: ""});
    setIsLoading({...isLoading, addInHeadBtn: false});
    setIsDisabled({...isDisabled, 
      addInTailBtn: false,
      removeFromHeadBtn: false,
      removeFromTailBtn: false,
      addByIndexBtn: false,
      removeByIndexBtn: false,})
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={cls.header}>
        <Input
          maxLength={4}
          isLimitText
          placeholder={"Введите значение"}
          style={{ minWidth: "204px" }}
          value={valuesInput.data}
          onChange={(e) => setValuesInput({...valuesInput, data: e.currentTarget.value})}
        />
        <Button
          text="Добавить в head"
          style={{ minWidth: "175px" }}
          disabled={isDisabled.addInHeadBtn || valuesInput.data === ""}
          isLoader={isLoading.addInHeadBtn}
          onClick={addToHead}
        />
        <Button text="Добавить в tail" style={{ minWidth: "175px" }} disabled={isDisabled.addInTailBtn || valuesInput.data === ""}
          isLoader={isLoading.addInTailBtn}/>
        <Button text="Удалить из head" style={{ minWidth: "175px" }} disabled={isDisabled.removeFromHeadBtn}
          isLoader={isLoading.removeFromHeadBtn}/>
        <Button text="Удалить из tail" style={{ minWidth: "175px" }} disabled={isDisabled.removeFromTailBtn}
          isLoader={isLoading.removeFromTailBtn}/>
        <Input
          min={0}
          max={10}
          maxLength={2}
          type="number"
          value={valuesInput.index}
          style={{ minWidth: "204px" }}
          placeholder={"Введите индекс"}
          onChange={(e) => setValuesInput({...valuesInput, index: e.currentTarget.value})}
        />
        <Button text="Добавить по индексу" style={{ minWidth: "362px" }} disabled={isDisabled.addByIndexBtn || valuesInput.data === "" || valuesInput.index === ""}
          isLoader={isLoading.addByIndexBtn} />
        <Button text="Удалить по индексу" style={{ minWidth: "362px" }} disabled={isDisabled.removeByIndexBtn || valuesInput.index === ""}
          isLoader={isLoading.removeByIndexBtn}/>
      </div>
      <ul className={cls.list}>
        {linkedList.map((el, index) => {
          return (
            <div className={cls.item} key={index}>
              <Circle
                letter={el}
                index={index}
                state={index === 0 ? colorCircle : ElementStates.Default}
                tail={index === linkedList.length - 1 ? "tail" : ""}
                head={
                  index === 0 ? (
                    status === "add-in-head" ? (
                      <Circle
                        isSmall={true}
                        letter={valuesInput.data}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "head"
                    )
                  ) : (
                    ""
                  )
                }
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
