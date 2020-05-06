import { Memory } from "./modules/memory.js";
import { Timer } from "./modules/timer.js";
import { Settings } from "./modules/settings.js";
import { toggleClass, setPageColors } from "./modules/utils.js";
import { LeaderBoard } from "./modules/leaderboard.js";

const settings = new Settings(document.querySelector("#settings-form"));
const memory = new Memory(document.querySelector("#memory"), settings.getSetting('board-size'), settings.getSetting('default-character'));
const timer = new Timer(document.querySelector("#timer"));
const leaderboard = new LeaderBoard(document.querySelector("#scores"));

memory.registerEventHandler(memory.EVENT_START, timer.startTimer.bind(timer));
memory.registerEventHandler(memory.EVENT_WIN, timer.stopTimer.bind(timer));

// Memory win
memory.registerEventHandler(memory.EVENT_WIN, () => {
    timer.stopTimer();
    const name = prompt("You won! Please enter your name.");
    leaderboard.addScore(name, timer.getTime());
    timer.resetTime();
    memory.restart();
});

// Settings update
settings.registerSettingsHandler(newSettings => {
    setPageColors(newSettings.get('primary-color'), newSettings.get('secondary-color'));

    // Reset memory with new settings
    memory.initialize(newSettings.get('board-size'), newSettings.get('default-character'));
});

// Register tettings bar toggle event
document.querySelector("#settings-bar #settings-toggle").addEventListener(
    'click', () => toggleClass(document.querySelector("#settings-bar"), "open")
);

// Register reset button event
document.querySelector("#settings-bar #restart").addEventListener(
    'click', () => {
        timer.stopTimer();
        timer.resetTime();
        memory.restart();
    }
);