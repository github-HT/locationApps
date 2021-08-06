import {combineReducers, createStore} from 'redux';
import StylesReducer from './reducers/StylesReducer';
import ThemeReducer from './reducers/ThemeReducer';
import UserReducer from './reducers/UserReducer';
const reducers = combineReducers({
  theme: ThemeReducer,
  styles: StylesReducer,
  user: UserReducer,
});
const store = createStore(reducers);
export default store;
