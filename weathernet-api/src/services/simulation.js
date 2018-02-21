class Simulation {
  constructor(interval, incrementAtEachInterval, action) {
    this.interval = interval || 5 * 1000; // 5 seconds
    this.incrementAtEachInterval = incrementAtEachInterval || 60 * 60 * 1000; // An hour
    this.action = action || (time => {});
    this.time = new Date().getTime();
  }

  start() {
    // Remove any timer before starting
    this.stop();

    this.timer = setInterval(() => {
      this.time += this.incrementAtEachInterval;
      this.action(this.time);
    }, this.interval);
  }

  stop() {
    this.timer && this.timer();
  }

  setAction(func) {
    this.action = func;
  }
}

module.exports = Simulation;
