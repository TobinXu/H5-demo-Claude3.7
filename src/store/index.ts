import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './userSlice';

// 创建Redux store
export const store = configureStore({
  reducer: {
    // 添加reducer
    user: userReducer,
  },
  // 添加中间件，如果需要的话
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// 可选，但是对于refetchOnFocus和refetchOnReconnect功能是必须的
// 详见 https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

// 从store本身推断出RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;