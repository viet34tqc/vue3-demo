export const debounce = (callback, wait = 300) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(null, args);
    }, wait);
  };
};
