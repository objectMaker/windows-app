import { Tray, protocol,net } from 'electron';
import path from 'path';
import url, {pathToFileURL} from 'url';


import {createMainWindow} from '../createMainWindow';
import ipcMainEventsInit from '../ipcMainEvents';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
    const mainWindow = createMainWindow();

    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {  
      // 检查并修改响应头中的 Content-Security-Policy  
      const csp = details.responseHeaders['Content-Security-Policy'];  
      console.log(csp,'csp')
      if (csp) {  
        // 移除现有的 CSP 或添加需要的指令  
        const newCsp = csp[0].replace(/default-src 'self'/, "default-src 'self' blob:");  
        details.responseHeaders['Content-Security-Policy'] = [newCsp];  
      }  
      callback({ responseHeaders: details.responseHeaders });  
    });
    ipcMainEventsInit(mainWindow)

    protocol.registerFileProtocol('xxxx', (request, callback) => {
      const url = request.url.substr(7)
      console.log(url,'urllll')
      callback(decodeURI(path.normalize(url)))
    })
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setMinimizable(true);
    mainWindow.setIcon(path.join(__dirname, '../../static/icons/main.png'));
    protocol.handle('atom', (request) => {
      const filePath = request.url.slice('atom://'.length)
      console.log(path.join(__dirname, filePath),'paht')
      // return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
      console.log('xxxxx')
      console.log(pathToFileURL('C:/Users/objectMaker/Desktop/songs/countStar.mp3'),'xxx')
      console.log(pathToFileURL('C:/Users/objectMaker/Desktop/songs/countStar.mp3').toString(),'fdfdsfsd')
      return net.fetch(pathToFileURL('C:/Users/objectMaker/Desktop/songs/countStar.mp3').toString())
    })

    const tray = new Tray(path.join(__dirname, '../../static/icons/main.png'))
  
    tray.setToolTip('touch fish')
  
    tray.on('click', ()=>{
      mainWindow.restore()
    })
  };