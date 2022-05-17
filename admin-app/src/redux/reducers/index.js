import { combineReducers } from 'redux';
import { AuthReducer } from './auth/auth.reducer';

const rootReducer = combineReducers({
	Auth: AuthReducer,
});

export default rootReducer;
