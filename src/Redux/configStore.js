import {combineReducers, createStore} from 'redux';
import {QuanLySinhVienReducer} from '../Redux/QuanLySinhVienReducer';

const rootReducer = combineReducers({
  QuanLySinhVienReducer,

});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
