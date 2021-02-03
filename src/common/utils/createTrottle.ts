export const createThrottle = (callback: () => any) => {
  let canFetch = true;
  return () => {
    if (!canFetch) {
      console.log("아직 thrttle 대기 중");
      return;
    }
    canFetch = false;
    setTimeout(() => {
      canFetch = true;
      callback();
    }, 10000);
  };
};
