import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
//import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

export const store = createStore( 
    rootReducer, 
    //applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export const persistor = persistStore(store);