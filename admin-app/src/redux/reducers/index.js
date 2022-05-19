import { combineReducers } from 'redux';
import { AuthReducer } from './auth/auth.reducer';
import { UserReducer } from './user/user.reducer';
import { CategoryReducer } from './category/category.reducer';
import { ProductReducer } from './product/product.reducer';
import { OrderReducer } from './order/order.reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	newuser: UserReducer,
	category: CategoryReducer,
	product: ProductReducer,
	order: OrderReducer,
});

export default rootReducer;
