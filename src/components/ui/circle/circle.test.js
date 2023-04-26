import renderer from 'react-test-renderer';

import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Компонент <Circle />', () => {
    it('отрисовывается без буквы', () => {
        const tree = renderer
          .create(<Circle />)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c буквами', () => {
        const tree = renderer
          .create(<Circle letter='Test'/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c head', () => {
        const tree = renderer
          .create(<Circle head='Test'/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c react-элементом в head', () => {
        const tree = renderer
          .create(<Circle head={<Circle/>}/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c tail', () => {
        const tree = renderer
          .create(<Circle tail='Test'/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c react-элементом в tail', () => {
        const tree = renderer
          .create(<Circle tail={<Circle/>}/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается c index', () => {
        const tree = renderer
          .create(<Circle index='0'/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается с пропсом isSmall', () => {
        const tree = renderer
          .create(<Circle isSmall/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается в состоянии default', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Default}/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается в состоянии changing', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Changing}/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
    it('отрисовывается в состоянии modified', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Modified}/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
    }); 
});