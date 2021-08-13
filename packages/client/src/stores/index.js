import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

let middleware = composeWithDevTools(applyMiddleware());

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware();
}

const store = createStore(rootReducer, middleware);

export default store;
