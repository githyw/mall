//防抖 封装debounce函数，作用是不会频繁调用，如果下一次执行来的非常快，那么会将上一次取消掉
export default function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    //timer有值   取消掉timer
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
