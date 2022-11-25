const cancelableDebounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return {
    debouncer: function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    },
    cancel: function () {
      clearTimeout(timeoutId);
    },
  };
};

export default cancelableDebounce;
