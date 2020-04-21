export const timer = (() => {
    'use strict';

    let timerLabel;
    let time;

    return {
        initialize: (selector) => {
            timerLabel = document.querySelector(selector);
            time = 0;
        },
        startTimer: () => {
            setInterval(() => {
                //update clock
                time++;
                timerLabel.innerText = time;
                console.log("tick", time);
            }, 1000);

            timerLabel.innerText = time;
        }
    }
})();