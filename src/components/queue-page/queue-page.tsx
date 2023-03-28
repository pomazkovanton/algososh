import React, { useState } from "react";

import cls from "./queue-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TQueue, TQueueStatus } from "../../types/utils";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [queue, setQueue] = useState<TQueue>({
    items: new Array(7).fill(""),
    head: -1,
    tail: -1,
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
  const [status, setStatus] = useState<TQueueStatus>(null);
  const [colorCircle, setColorCircle] = useState(ElementStates.Default);

  const changeColorCircle = async (ms: number) => {
    setColorCircle(ElementStates.Changing);
    await delay(ms);
    setColorCircle(ElementStates.Default);
  };

  const enqueue = async (e: React.FormEvent<HTMLFormElement>, item: string) => {
    e.preventDefault();
    let { items, tail, head } = queue;
    setStatus("enqueue");
    setIsLoading({ ...isLoading, addBtn: true });
    setIsDisabled({ ...isDisabled, deleteBtn: true, clearBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    if (head === tail && head !== -1 && items[head] === "") {
      head = head + 1;
    }
    tail = tail + 1;
    head = tail === 0 ? head + 1 : head;
    items[tail] = item;
    setQueue({ items: items, tail: tail, head: head });
    setValueInput("");
    setIsLoading({ ...isLoading, addBtn: false });
    setIsDisabled({ ...isDisabled, deleteBtn: false, clearBtn: false });
    setStatus(null);
  };

  const dequeue = async () => {
    let { items, head, tail } = queue;
    setStatus("dequeue");
    setIsLoading({ ...isLoading, deleteBtn: true });
    setIsDisabled({ ...isDisabled, addBtn: true, clearBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    items[head] = "";
    if (head !== tail) {
      head = head + 1;
    }
    setQueue({ ...queue, items: items, head: head });
    setIsLoading({ ...isLoading, deleteBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, clearBtn: false });
    setStatus(null);
  };

  const clear = async () => {
    setStatus("clear");
    setIsLoading({ ...isLoading, clearBtn: true });
    setIsDisabled({ ...isDisabled, addBtn: true, deleteBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    setQueue({ items: new Array(7).fill(""), head: -1, tail: -1 });
    setIsLoading({ ...isLoading, clearBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, deleteBtn: false });
    setStatus(null);
  };

  return (
    <SolutionLayout title='Очередь'>
      <div className={cls.header}>
        <form className={cls.form} onSubmit={(e) => enqueue(e, valueInput)}>
          <Input maxLength={4} isLimitText value={valueInput} onChange={(e) => setValueInput(e.currentTarget.value)} />
          <Button
            text='Добавить'
            type='submit'
            isLoader={isLoading.addBtn}
            disabled={valueInput === "" || queue.tail >= 6 || isDisabled.addBtn}
            style={{ minWidth: "120px" }}
          />
        </form>
        <ul className={cls.list}>
          <li>
            <Button
              text='Удалить'
              style={{ minWidth: "110px" }}
              isLoader={isLoading.deleteBtn}
              onClick={dequeue}
              disabled={isDisabled.deleteBtn || queue.tail < 0 || queue.head > 6 || queue.items[queue.head] === ""}
            />
          </li>
          <li>
            <Button
              text='Очистить'
              style={{ minWidth: "120px" }}
              isLoader={isLoading.clearBtn}
              onClick={clear}
              disabled={isDisabled.clearBtn || queue.tail < 0}
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
              tail={queue.tail === index ? "tail" : ""}
              state={
                (index === queue.tail + 1 && status === "enqueue") ||
                (index === queue.head && status === "dequeue") ||
                status === "clear"
                  ? colorCircle
                  : ElementStates.Default
              }
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
