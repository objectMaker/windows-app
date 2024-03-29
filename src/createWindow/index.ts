import { Tray, protocol,net,session } from 'electron';
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
      if (csp) {  
        // 移除现有的 CSP 或添加需要的指令  
        const newCsp = csp[0].replace(/default-src 'self'/, "default-src 'self' blob:");  
        details.responseHeaders['Content-Security-Policy'] = [newCsp];  
      }  
      callback({ responseHeaders: details.responseHeaders });  
    });
    ipcMainEventsInit(mainWindow)

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setMinimizable(true);
    mainWindow.setIcon('static/icons/main.png');
    protocol.handle('atom', (request) => {
      const filePath = request.url.slice('atom://'.length)
      return net.fetch(pathToFileURL(filePath+'/1.mp3').toString())
    })

    const tray = new Tray('static/icons/main.png')
  
    tray.setToolTip('touch fish')
  
    tray.on('click', ()=>{
      mainWindow.restore()
    })
    console.log(__dirname,'__dirname+++')
    session.defaultSession.loadExtension(
      // (path.resolve(process.env.HOME, '.config/chromium/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_0'))
      'C:/Users/yu/AppData/Local/Microsoft/Edge/User Data/Default/Extensions/gpphkfbcpidddadnkolkpfckpihlkkil/5.0.2_0',
      // path.resolve(process.env.HOME, '.config/chromium/Default/Extensions/gpphkfbcpidddadnkolkpfckpihlkkil/5.0.2_0'),
      // allowFileAccess is required to load the devtools extension on file:// URLs.
      { allowFileAccess: true }
    )
    console.log('xxx')
  };