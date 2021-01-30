function pad(value) {
  return String(value).padStart(2, "0")
}

function updateTimer(time) {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  
    clockHours.textContent = hours;
    clockMins.textContent = mins;
    clockSecs.textContent = secs;
  }

  const start = function () {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      updateTimer(deltaTime)
    }, 1000)
}