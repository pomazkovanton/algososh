import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from "./button";

describe('Компонент <Button />', () => {
    it('отрисовывается с текстом', () => {
        const tree = renderer
          .create(<Button  text="Кнопка"/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 

    it('отрисовывается без текста', () => {
        const tree = renderer
          .create(<Button />)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 

    it('отрисовывается в сотоянии disabled', () => {
        const tree = renderer
          .create(<Button disabled/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 

    it('отрисовывается с индикацией загрузки', () => {
        const tree = renderer
          .create(<Button isLoader/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    
    it('отрабатывается вызов колбека при клике', () => {
        window.alert = jest.fn();
        render(<Button text="Кнопка" onClick={alert("Кнопка нажата!")}/>)
        const btn = screen.getByText("Кнопка");
        fireEvent.click(btn);
        expect(window.alert).toHaveBeenCalledWith('Кнопка нажата!');
    }); 
});