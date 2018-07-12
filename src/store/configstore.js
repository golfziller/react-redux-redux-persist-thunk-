import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
export default function configureStore(initialState) {

    // const composeEnhancers = 
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    //         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    //             // options like actionSanitizer, stateSanitizer
    //         }) : compose;

    // const enhancer = composeEnhancers(
    //     applyMiddleware(thunk)
    // );
    const persistConfig = {
        key: 'root',
        storage,
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const enhancer = applyMiddleware(thunk)
    let store = createStore(persistedReducer,initialState,enhancer)
    let persistor = persistStore(store)

  
    // return createStore(
    //     rootReducer,
    //     initialState,
    //     enhancer
    // );
    return { store, persistor }
}