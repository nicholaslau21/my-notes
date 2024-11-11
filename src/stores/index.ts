import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "./note";
import folderReducer from "./folder";

const rootReducer = combineReducers({
    notes: noteReducer,
    folders: folderReducer,
});

function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore;
