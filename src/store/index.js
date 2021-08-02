import {combineReducers, createStore} from 'redux';
import StylesReducer from './reducers/StylesReducer';
import ThemeReducer from './reducers/ThemeReducer';
const reducers = combineReducers({
  theme: ThemeReducer,
  styles: StylesReducer,
});
const store = createStore(reducers);
export default store;
