let lastInvokeTime: number | undefined;
let timerId: NodeJS.Timeout | undefined;

const throttling = (callback: () => void, delay: number) => {
  const currentTime = Date.now();

  if (!lastInvokeTime) {
    // 첫 호출
    callback();
    lastInvokeTime = currentTime;
  } else {
    // 마지막 호출 시점으로부터 delay 이상 경과했을 때만 다시 호출
    const elapsedTime = currentTime - lastInvokeTime;
    const remainingTime = delay - elapsedTime;

    if (remainingTime <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = undefined;
      }
      callback();
      lastInvokeTime = currentTime;
    } else if (!timerId) {
      timerId = setTimeout(() => {
        callback();
        lastInvokeTime = Date.now();
        timerId = undefined;
      }, remainingTime);
    }
  }
};

export default throttling;
