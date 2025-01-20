// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlice"; 

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import counterSlice from "./slice/authSlice";
const persistConfig = {
    key: 'redux-storage',
    storage,
    timeout: 100
};

// Combine Reducers
const rootReducer = combineReducers({
    auth: counterSlice,
});

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
