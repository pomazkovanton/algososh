import React, { useEffect, useState } from "react";
import cls from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [stack, setStack] = useState<string[]>([]);
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

  const pushStack = async (
    e: React.FormEvent<HTMLFormElement>,
    item: string
  ) => {
    e.preventDefault();
    if (stack.length > 19) {
      return alert("Ошибка. Превышено число элементов (не более 20)");
    }
    setIsLoading({ ...isLoading, addBtn: true });
    setIsDisabled({ ...isDisabled, deleteBtn: true, clearBtn: true });
    setColorCircle(ElementStates.Changing);
    setStack((stack) => [...stack, item]);
    setValueInput("");
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
    setStack((stack) => [...stack.slice(0, stack.length - 1)]);
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
    setStack([]);
    setIsClearStack(false);
    setIsLoading({ ...isLoading, clearBtn: false });
    setIsDisabled({ ...isDisabled, addBtn: false, deleteBtn: false });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={cls.header}>
        <form className={cls.form} onSubmit={(e) => pushStack(e, valueInput)}>
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
            disabled={valueInput === "" || isDisabled.addBtn}
            style={{ minWidth: "120px" }}
          />
        </form>
        <ul className={cls.list}>
          <li>
            <Button
              text="Удалить"
              style={{ minWidth: "110px" }}
              isLoader={isLoading.deleteBtn}
              onClick={popStack}
              disabled={stack.length === 0 || isDisabled.deleteBtn}
            />
          </li>
          <li>
            <Button
              text="Очистить"
              style={{ minWidth: "120px" }}
              isLoader={isLoading.clearBtn}
              onClick={clearStack}
              disabled={stack.length === 0 || isDisabled.clearBtn}
            />
          </li>
        </ul>
      </div>
      <ul className={cls.stack}>
        {stack &&
          stack.map((el, index) => {
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                head={index === stack.length - 1 ? "top" : ""}
                state={
                  index === stack.length - 1 || isClearStack
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
