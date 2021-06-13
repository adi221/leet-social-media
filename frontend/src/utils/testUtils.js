import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { middleware } from '../store';

/**
 * Function to find a component by it's data-test attribute
 * @function findByTestAttribute
 * @param {ShallowWarapper} component that will be shallow wrapped
 * @param {string} attr Attribute to find
 * @returns {JSX.Element}
 */
export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

/**
 * Function to check props on a react component
 * @function checkProps
 * @param {React.Component} Component Component to assert on.
 * @param {object} expectedProps Expected props.
 * @returns {undefined | Error}
 */
/* eslint react/forbid-foreign-prop-types: 0 */
export const checkProps = (Component, expectedProps) => {
  const result = checkPropTypes(
    Component.propTypes,
    expectedProps,
    'prop',
    Component.name
  );

  return result;
};

/**
 * Create a testing store with imported reducers, middleware,and initial state
 *  globals: rootReducer, middlewares.
 * @function storeFactory
 * @param {object} initialState Initial state for the store.
 * @returns {store} Redux store
 */
export const storeFactory = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
