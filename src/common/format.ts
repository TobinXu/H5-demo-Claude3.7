/**
 * 格式化工具函数
 */

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化模板，默认 'YYYY-MM-DD'
 */
export const formatDate = (date: Date | number | string, format: string = 'YYYY-MM-DD'): string => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.error('无效的日期');
    return '';
  }
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  
  const padZero = (num: number): string => num < 10 ? `0${num}` : `${num}`;
  
  return format
    .replace('YYYY', `${year}`)
    .replace('MM', padZero(month))
    .replace('DD', padZero(day))
    .replace('HH', padZero(hours))
    .replace('mm', padZero(minutes))
    .replace('ss', padZero(seconds));
};

/**
 * 格式化金额
 * @param amount 金额数值
 * @param decimals 小数位数，默认2位
 * @param symbol 货币符号，默认'¥'
 */
export const formatCurrency = (amount: number, decimals: number = 2, symbol: string = '¥'): string => {
  if (isNaN(amount)) {
    console.error('无效的金额');
    return '';
  }
  
  const formatted = amount.toFixed(decimals);
  const [integer, decimal] = formatted.split('.');
  
  // 添加千位分隔符
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return `${symbol}${formattedInteger}${decimal ? `.${decimal}` : ''}`;
};

/**
 * 格式化手机号码
 * @param phone 手机号码
 * @param separator 分隔符，默认空格
 */
export const formatPhone = (phone: string, separator: string = ' '): string => {
  if (!phone || !/^\d+$/.test(phone)) {
    console.error('无效的手机号码');
    return phone;
  }
  
  // 标准手机号格式：3-4-4
  if (phone.length === 11) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
  }
  
  return phone;
};

/**
 * 文件大小格式化
 * @param bytes 字节数
 * @param decimals 小数位数，默认2位
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * 数字千分位格式化
 * @param num 数字
 */
export const formatThousands = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};