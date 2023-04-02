import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import cls from "./queue-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { TQueue, TQueueStatus } from "../../types/utils";
import { Queue } from "../../utils/queue";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ data: "" });
  const [queueState, setQueueState] = useState<TQueue>({ items: [], tail: 0, head: 0 });
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
  const queue = useRef() as MutableRefObject<Queue<string>>;

  useEffect(() => {
    queue.current = new Queue<string>(7);
    setQueueState(getDataQueue(queue));
  }, []);

  const getDataQueue = (queue: MutableRefObject<Queue<string>>): TQueue => {
    return { items: queue.current.getElements(), head: queue.current.getHead(), tail: queue.current.getTail() };
  };

  const changeColorCircle = async (ms: number) => {
    setColorCircle(ElementStates.Changing);
    await delay(ms);
    setColorCircle(ElementStates.Default);
  };

  const enqueue = async (e: React.FormEvent<HTMLFormElement>, item: string) => {
    e.preventDefault();
    setStatus("enqueue");
    setIsLoading({ ...isLoading, addBtn: true });
    setIsDisabled({ ...isDisabled, deleteBtn: true, clearBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    queue.current.enqueue(item);
    setQueueState(getDataQueue(queue));
    setValues({ data: "" });
    setIsLoading({ ...isLoading, addBtn: false });
    setIsDisabled({ ...isDisabled, deleteBtn: false, clearBtn: false });
    setStatus(null);
  };

  const dequeue = async () => {
    setStatus("dequeue");
    setIsLoading({ ...isLoading, deleteBtn: true });
    setIsDisabled({ ...isDisabled, addBtn: true, clearBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    queue.current.dequeue();
    setQueueState(getDataQueue(queue));
    setIsLoading({ ...isLoading, deleteBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, clearBtn: false });
    setStatus(null);
  };

  const clear = async () => {
    setStatus("clear");
    setIsLoading({ ...isLoading, clearBtn: true });
    setIsDisabled({ ...isDisabled, addBtn: true, deleteBtn: true });
    await changeColorCircle(SHORT_DELAY_IN_MS);
    queue.current.clear();
    setQueueState(getDataQueue(queue));
    setIsLoading({ ...isLoading, clearBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, deleteBtn: false });
    setStatus(null);
  };

  return (
    <SolutionLayout title='Очередь'>
      <div className={cls.header}>
        <form className={cls.form} onSubmit={(e) => enqueue(e, values.data)}>
          <Input maxLength={4} isLimitText value={values.data} onChange={handleChange} name='data' />
          <Button
            text='Добавить'
            type='submit'
            isLoader={isLoading.addBtn}
            disabled={values.data === "" || queueState.tail >= 7 || isDisabled.addBtn}
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
              disabled={
                isDisabled.deleteBtn ||
                queueState.tail < 0 ||
                queueState.head > 6 ||
                queueState.items[queueState.head] === null
              }
            />
          </li>
          <li>
            <Button
              text='Очистить'
              style={{ minWidth: "120px" }}
              isLoader={isLoading.clearBtn}
              onClick={clear}
              disabled={isDisabled.clearBtn || queueState.tail === 0}
            />
          </li>
        </ul>
      </div>
      <ul className={cls.queue}>
        {queueState.items.map((el, index) => {
          return (
            <Circle
              key={index}
              letter={el || undefined}
              index={index}
              head={
                queueState.head === index || (queueState.head > 6 && index === queueState.items.length - 1) ? HEAD : ""
              }
              tail={queueState.tail - 1 === index && queueState.items[queueState.tail - 1] !== null ? TAIL : ""}
              state={
                (index === queueState.tail && status === "enqueue") ||
                (index === queueState.head && status === "dequeue") ||
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
