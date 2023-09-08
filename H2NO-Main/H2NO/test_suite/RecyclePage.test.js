import React from 'react';
import renderer from 'react-test-renderer';
import RecyclePage from '../components/RecyclePage';

describe('<RecyclePage/>', () => {
  it("has 1 children", () => {
    const tree = renderer.create(<RecyclePage/>).toJSON();
    expect(tree.children.length).toBe(1);
  })
  it('renders correctly', () => {
    const tree = renderer.create(<RecyclePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});