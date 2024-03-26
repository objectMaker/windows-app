import { Tray, protocol } from 'electron';
import path from 'path';
import {createMainWindow} from '../createMainWindow';
import ipcMainEventsInit from '../ipcMainEvents';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
    const mainWindow = createMainWindow();
    ipcMainEventsInit(mainWindow)
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setMinimizable(true);
    mainWindow.setIcon(path.join(__dirname, '../../static/icons/main.png'));
    protocol.registerFileProtocol('atom', (request, callback) => {
        const url = request.url.substr(7)
        callback(decodeURI(path.normalize(url)))
      })
    const tray = new Tray(path.join(__dirname, '../../static/icons/main.png'))
  
    tray.setToolTip('touch fish')
  
    tray.on('click', ()=>{
      mainWindow.restore()
    })
  };