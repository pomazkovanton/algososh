import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import cls from "./stack-page.module.css";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../utils/stack";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ data: "" });
  const [stackState, setStackState] = useState<string[]>([]);
  const [colorCircle, setColorCircle] = useState(ElementStates.Default);
  const [isClearStack, setIsClearStack] = useState(false);
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
  const stack = useRef() as MutableRefObject<Stack<string>>;

  useEffect(() => {
    stack.current = new Stack<string>();
    setStackState(stack.current.getElements());
  }, []);

  const pushStack = async (e: React.FormEvent<HTMLFormElement>, item: string) => {
    e.preventDefault();
    if (stack.current.getSize() > 9) {
      return alert("Ошибка. Превышено число элементов (не более 20)");
    }
    setIsLoading({ ...isLoading, addBtn: true });
    setIsDisabled({ ...isDisabled, deleteBtn: true, clearBtn: true });
    setColorCircle(ElementStates.Changing);
    stack.current.push(item);
    setStackState(stack.current.getElements());
    setValues({ data: "" });
    await delay(SHORT_DELAY_IN_MS);
    setColorCircle(ElementStates.Default);
    setIsLoading({ ...isLoading, addBtn: false });
    setIsDisabled({ ...isDisabled, deleteBtn: false, clearBtn: false });
  };

  const popStack = async () => {
    setIsDisabled({ ...isDisabled, addBtn: true, clearBtn: true });
    setIsLoading({ ...isLoading, deleteBtn: true });
    setColorCircle(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setColorCircle(ElementStates.Default);
    stack.current.pop();
    setStackState(stack.current.getElements());
    setIsLoading({ ...isLoading, deleteBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, clearBtn: false });
  };

  const clearStack = async () => {
    setIsDisabled({ ...isDisabled, addBtn: true, deleteBtn: true });
    setIsLoading({ ...isLoading, clearBtn: true });
    setIsClearStack(true);
    setColorCircle(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setColorCircle(ElementStates.Default);
    stack.current.clear();
    setStackState(stack.current.getElements());
    setIsClearStack(false);
    setIsLoading({ ...isLoading, clearBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, deleteBtn: false });
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={cls.header}>
        <form className={cls.form} onSubmit={(e) => pushStack(e, values.data)}>
          <Input maxLength={4} isLimitText value={values.data} onChange={handleChange} name='data' />
          <Button
            text='Добавить'
            type='submit'
            isLoader={isLoading.addBtn}
            disabled={values.data === "" || isDisabled.addBtn}
            style={{ minWidth: "120px" }}
          />
        </form>
        <ul className={cls.list}>
          <li>
            <Button
              text='Удалить'
              style={{ minWidth: "110px" }}
              isLoader={isLoading.deleteBtn}
              onClick={popStack}
              disabled={stackState.length === 0 || isDisabled.deleteBtn}
            />
          </li>
          <li>
            <Button
              text='Очистить'
              style={{ minWidth: "120px" }}
              isLoader={isLoading.clearBtn}
              onClick={clearStack}
              disabled={stackState.length === 0 || isDisabled.clearBtn}
            />
          </li>
        </ul>
      </div>
      <ul className={cls.stack}>
        {stack &&
          stackState.map((el, index) => {
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                head={index === stackState.length - 1 ? "top" : ""}
                state={index === stackState.length - 1 || isClearStack ? colorCircle : ElementStates.Default}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
