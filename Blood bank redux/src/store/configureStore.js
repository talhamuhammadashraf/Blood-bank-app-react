
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';
import AuthReducer from '../reducers/authReducer'
import donatedetailsreducer from '../reducers/donatedetailsreducer'

// const configureStore = createStore(
//     combineReducers({
//    AuthReducer,
//   donatedetailsreducer}),(applyMiddleware(thunk))
  
// )

// export default configureStore;
export default createStore(
    combineReducers({
        AuthReducer,
        donatedetailsreducer
    }), {}, (applyMiddleware(thunk))
);