import { combineReducers } from 'redux';
import notification from './notification';
import gallery from './gallery';
import innerForm from './innerForm';

export default combineReducers({
  gallery,
  notification,
  innerForm,
});
