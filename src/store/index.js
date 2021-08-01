import {combineReducers, createStore} from 'redux';
import ThemeReducer from './reducers/ThemeReducer';
const reducers = combineReducers({
  ThemeReducer,
});
const store = createStore(reducers);
export default store;
