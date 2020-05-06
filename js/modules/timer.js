export class Timer
{
    START_TEXT = "Click card to start";

    timerElement;
    time = 0;
    timer;

    constructor(timerElement) {
        this.timerElement = timerElement;
        this.timerElement.innerText = this.START_TEXT;
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

    resetTime() {
        this.time = 0;
        this.timerElement.innerText = this.START_TEXT;
    }

    getTime() {
        return this.time;
    }
}