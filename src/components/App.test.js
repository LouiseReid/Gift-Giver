import React from 'react'
import { shallow } from 'enzyme'
import setupTests from './../setupTests.js';
import tempPolyfills from './../tempPolyfills';
import App from './App'

const app = shallow(<App/>);

describe('App', () => {

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  });

  it('initialises the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe('when clicking the `add gift` button', () => {
    const id = 1

    beforeEach(() => {
      app.find('.btn-add').simulate('click');
    });

    afterEach(() => {
      app.setState({gifts: []})
    })

    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([
        { id: 1 }
      ]);
    });

    it('adds a d new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(id);
    })

    it('creates a Gift component', () => {
      expect(app.find('Gift').exists()).toBe(true)
    })

    describe('and the user wants to remove the added gift', () => {

      beforeEach(() => {
        app.instance().removeGift(id);
      })

      it('removes the gift from `state`', () => {
        expect(app.state().gifts).toEqual([])
      })

    })

  })
})
