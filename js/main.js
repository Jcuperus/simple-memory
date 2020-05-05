import { Memory } from "./modules/memory.js";
import { Timer } from "./modules/timer.js";
import { Settings } from "./modules/settings.js";

const settings = new Settings(document.querySelector("#settings-form"));
const memory = new Memory(document.querySelector("#memory"), settings.getSetting('board-size'), settings.getSetting('default-character'));
const timer = new Timer(document.querySelector("#timer"));

memory.registerEventHandler(memory.EVENT_START, timer.startTimer.bind(timer));
memory.registerEventHandler(memory.EVENT_WIN, timer.stopTimer.bind(timer));

// Settings update
settings.registerSettingsHandler(newSettings => {
    setColors(newSettings.get('primary-color'), newSettings.get('secondary-color'));

    // Reset memory
    memory.initialize(newSettings.get('board-size'), newSettings.get('default-character'));
});

// Settings bar toggle
document.querySelector("#settings-bar #settings-toggle").addEventListener('click', () => {
    const settingsBar = document.querySelector("#settings-bar");
    if (settingsBar.classList.contains('open')) {
        settingsBar.classList.remove('open');
    } else {
        settingsBar.classList.add('open');
    }
});

// Reset button
document.querySelector("#settings-bar #restart").addEventListener('click', () => {
    memory.initialize(settings.getSetting('board-size'), settings.getSetting('default-character'));
});

function setColors(primaryColor, secondaryColor) {
    document.querySelector("body").style.color = primaryColor;
    document.querySelector("body").style.borderColor = primaryColor;
    document.querySelector("body").style.backgroundColor = secondaryColor;

    for (let element of document.querySelectorAll(".dynamic-color")) {
        element.style.color = primaryColor;
        element.style.borderColor = primaryColor;
    }

    let style = document.querySelector("#custom-color-sheet");
    let css = "#memory td.active { background-color: " + primaryColor + "; color: " + secondaryColor + " }";

    if (!style) {
        style = document.createElement("style");
        style.id = "custom-color-sheet";
        document.head.appendChild(style);
    } else {
        style.innerHTML = '';
    }

    style.appendChild(document.createTextNode(css));
}