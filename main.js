const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('./client/index.html');
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdates();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

autoUpdater.on('update-available', () => {
    autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});

ipcMain.handle('read-clicks', async () => {
    try {
        const dataFilePath = path.join(app.getPath('userData'), 'clickData.txt');
        const data = await fs.promises.readFile(dataFilePath, 'utf-8');
        return parseInt(data, 10);
    } catch (error) {
        return 0;
    }
});

ipcMain.handle('write-clicks', async (_, clicks) => {
    try {
        const dataFilePath = path.join(app.getPath('userData'), 'clickData.txt');
        await fs.promises.writeFile(dataFilePath, String(clicks));
        return true;
    } catch (error) {
        return false;
    }
});
