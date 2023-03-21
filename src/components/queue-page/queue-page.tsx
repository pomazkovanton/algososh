import React, { useState } from "react";
import cls from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TQueue } from "../../types/utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [queue, setQueue] = useState<TQueue>({
    items: new Array(7).fill(""),
    head: 0,
    tail: 0,
  });
  const [isLoading, setIsLoading] = useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  });
  const [isDisabled, setIsDisabled] = useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  });
  const [colorCircle, setColorCircle] = useState(ElementStates.Default);

  const enqueue = async (e: React.FormEvent<HTMLFormElement>, item: string) => {
    e.preventDefault();
    const { items, tail } = queue;
    setIsLoading({ ...isLoading, addBtn: true });
    setIsDisabled({ ...isDisabled, deleteBtn: true, clearBtn: true });
    setColorCircle(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setColorCircle(ElementStates.Default);
    items[tail] = item;
    setQueue({ ...queue, items: items, tail: tail + 1 });
    setValueInput("");
    setIsLoading({ ...isLoading, addBtn: false });
    setIsDisabled({ ...isDisabled, deleteBtn: false, clearBtn: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={cls.header}>
        <form className={cls.form} onSubmit={(e) => enqueue(e, valueInput)}>
          <Input
            maxLength={4}
            isLimitText
            value={valueInput}
            onChange={(e) => setValueInput(e.currentTarget.value)}
          />
          <Button
            text="Добавить"
            type="submit"
            isLoader={isLoading.addBtn}
            disabled={valueInput === "" || queue.tail > 6 || isDisabled.addBtn}
            style={{ minWidth: "120px" }}
          />
        </form>
        <ul className={cls.list}>
          <li>
            <Button
              text="Удалить"
              style={{ minWidth: "110px" }}
              isLoader={isLoading.deleteBtn}
              onClick={() => console.log("delete")}
              disabled={isDisabled.deleteBtn}
            />
          </li>
          <li>
            <Button
              text="Очистить"
              style={{ minWidth: "120px" }}
              isLoader={isLoading.clearBtn}
              onClick={() => console.log("clear")}
              disabled={isDisabled.clearBtn}
            />
          </li>
        </ul>
      </div>
      <ul className={cls.queue}>
        {queue.items.map((el, index) => {
          return (
            <Circle
              key={index}
              letter={el}
              index={index}
              head={queue.head === index ? "head" : ""}
              tail={queue.tail - 1 === index ? "tail" : ""}
              state={index === queue.tail ? colorCircle : ElementStates.Default}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
