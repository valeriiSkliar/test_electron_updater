const { ipcRenderer } = require('electron');

let clickCounter = 0;
const clickCounterElement = document.getElementById('click-counter');

async function initialize() {
    clickCounter = await ipcRenderer.invoke('read-clicks');
    updateClickCounterDisplay();
}

function updateClickCounterDisplay() {
    clickCounterElement.textContent = clickCounter;
}

function onButtonClick() {
    clickCounter += 1;
    updateClickCounterDisplay();
    ipcRenderer.invoke('write-clicks', clickCounter);
}

document.getElementById('click-button').addEventListener('click', onButtonClick);

initialize();
