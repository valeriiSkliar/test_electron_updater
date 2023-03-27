const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        }
    });

    win.loadFile('./client/index.html');
}
autoUpdater.on('update-downloaded', () => {
    promptForUpdate();
});

async function promptForUpdate() {
    const response = await dialog.showMessageBox({
        type: 'question',
        buttons: ['Install and Restart', 'Cancel'],
        defaultId: 0,
        title: 'Update Available',
        message: 'An update is available. Do you want to install and restart the application?'
    });

    if (response.response === 0) {
        autoUpdater.quitAndInstall();
    }
}


app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdates();
});

// app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }


});
