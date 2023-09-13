import { configureStore } from '@reduxjs/toolkit'

//import Reducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

console.log('store', store.getState())

export default store
