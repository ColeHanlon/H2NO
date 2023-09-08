import React from 'react';
import renderer from 'react-test-renderer';
import SmartHomePage from '../components/smart_home_page';
import { TouchableOpacity } from 'react-native';
// import {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

describe('<Smart Home/>', () => {
  it("has 8 children", () => {
    const tree = renderer.create(<SmartHomePage/>).toJSON();
    expect(tree.children.length).toBe(8);
  })
  it('renders correctly', () => {
    const tree = renderer.create(<SmartHomePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  // it('click Thermostat', () => {
  //   const tree = renderer.create(<SmartHomePage/>);
  //   const mockcallback = jest.fn();
  //   const button = shallow((<TouchableOpacity onPress={mockcallback}>ok!</TouchableOpacity>));
  //   button.find('button').simulate('click');
  //   expect(mockCallBack.mock.calls.length).toEqual(1);
  // })
})