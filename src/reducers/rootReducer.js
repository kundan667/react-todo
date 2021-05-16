import todoReducers from './todoReducer'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todoReducers']
}
const rootReducer = combineReducers({
    todoReducers
})
export default persistReducer( persistConfig, rootReducer )