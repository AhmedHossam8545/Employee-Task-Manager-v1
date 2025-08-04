
export function createTimeTracker() {
  let startTime: number | null = null;
  return {
    start: () => { startTime = Date.now(); },
    stop: () => {
      if (!startTime) throw new Error("Timer not started");
      const duration = Date.now() - startTime;
      startTime = null;
      return duration;
    }
  };
}
