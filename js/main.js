import { Memory } from "./modules/memory.js";
import { Timer } from "./modules/timer.js";

const memory = new Memory(document.querySelector("#memory"), 6);
const timer = new Timer(document.querySelector("#timer"));

memory.registerEventHandler(memory.EVENT_START, timer.startTimer.bind(timer));
memory.registerEventHandler(memory.EVENT_WIN, timer.stopTimer.bind(timer));