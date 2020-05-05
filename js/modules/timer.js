export class Timer
{
    TIMEOUT_EVENT = 'timeout';

    timerElement;
    time = 0;
    timer;

    constructor(timerElement) {
        this.timerElement = timerElement;
    }

    startTimer() {
        this.timerElement.innerText = this.time;

        this.timer = setInterval(() => {
            this.time++;
            this.timerElement.innerText = this.time;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }
}