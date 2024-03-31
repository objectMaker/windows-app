import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
let mainWindow: BrowserWindow;

export  function createMainWindow (){
    if(!mainWindow){
      mainWindow =  new BrowserWindow({
            width: 560,
            height: 100 ,
            // width: 560,
            // height: 600 ,
            type: 'toolbar', // 使用toolbar类型使窗口浮动
            frame: false, // 无边框，这样可以自定义窗口的外观
            resizable: false, // 不可调整大小
            alwaysOnTop: true, // 保持在顶部
            transparent: true, // 透明背景，这样可以看到后面的内容
            webPreferences: {
              webSecurity:false,
              nodeIntegration: true, // 允许在窗口中使用Node.js
              preload:MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
            
          });
    }
    return mainWindow
}
