import React from 'react';
import { mount, render, shallow } from 'enzyme';
// import { describe, it, expect } from 'jest';
// import { test } from './helpers';
import PledgeList from '../PledgeList';
import Pledge from '../Pledge';

// console.log('this is what the Pledge looks like', Pledge);

describe('PledgeList component', () => {
  it('renders the PledgeList wrapper', () => {
    const wrapper = shallow(<PledgeList />);
    expect(wrapper.find(Pledge)).toBeDefined();
  });
});
