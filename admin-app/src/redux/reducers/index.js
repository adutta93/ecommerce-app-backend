import { combineReducers } from 'redux';
import { AuthReducer } from './auth/auth.reducer';
import { UserReducer } from './user/user.reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	newuser: UserReducer,
});

export default rootReducer;
