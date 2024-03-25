import { app, BrowserWindow,ipcMain,Menu,Tray  } from 'electron';
import path from 'path';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    type: 'toolbar', // 使用toolbar类型使窗口浮动
    frame: false, // 无边框，这样可以自定义窗口的外观
    resizable: false, // 不可调整大小
    alwaysOnTop: false, // 保持在顶部
    transparent: true, // 透明背景，这样可以看到后面的内容
    webPreferences: {
      nodeIntegration: true, // 允许在窗口中使用Node.js
      preload:MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon:path.join(__dirname, '../../static/icons/main.png')
  });

  ipcMain.on('close-app', () => {
      app.quit();
  });
  ipcMain.on('minimize', () => {
      mainWindow.minimize();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.setMinimizable(true);
  mainWindow.setIcon(path.join(__dirname, '../../static/icons/main.png'));

  const tray = new Tray(path.join(__dirname, '../../static/icons/main.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setToolTip('touch fish')
  tray.setContextMenu(contextMenu)
  tray.on('click', ()=>{
    mainWindow.restore()
  })

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
