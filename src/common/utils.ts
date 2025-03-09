/**
 * 通用工具函数
 */

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间，单位毫秒
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param interval 间隔时间，单位毫秒
 */
export const throttle = <T extends (...args: any[]) => any>(fn: T, interval: number) => {
  let lastTime = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn(...args);
      lastTime = now;
    }
  };
};

/**
 * 获取本地存储数据
 * @param key 存储键名
 * @param defaultValue 默认值
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue ?? null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('获取本地存储数据失败:', error);
    return defaultValue ?? null;
  }
};

/**
 * 设置本地存储数据
 * @param key 存储键名
 * @param value 存储值
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('设置本地存储数据失败:', error);
  }
};

/**
 * 生成随机ID
 * @param length ID长度
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};