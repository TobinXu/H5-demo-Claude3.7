import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义用户状态的类型
interface UserState {
  nickname: string;
  level: number;
  points: number;
  avatar?: string;
  isLoggedIn: boolean;
}

// 初始状态
const initialState: UserState = {
  nickname: '用户昵称',
  level: 3,
  points: 1250,
  avatar: undefined,
  isLoggedIn: false,
};

// 创建用户slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    // 更新用户积分
    updatePoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    // 更新用户等级
    updateLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    // 登录
    login: (state) => {
      state.isLoggedIn = true;
    },
    // 登出
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// 导出actions
export const { setUserInfo, updatePoints, updateLevel, login, logout } = userSlice.actions;

// 导出reducer
export default userSlice.reducer;