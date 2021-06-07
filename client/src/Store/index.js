import { createStore, applyMiddleware} from "redux";
import rootReducer from "../Reducers/index";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];

const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)));
    
export default store;