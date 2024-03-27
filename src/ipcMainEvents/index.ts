import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';

import {getFilesByDirAndFileType} from '../utils'
export default function(mainWindow: Electron.BrowserWindow){
    ipcMain.on('close-app', () => {
        app.quit();
    });
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });
    //注册事件
    ipcMain.on('open-folder', openFolderDialog);
    
    
      // 当需要弹出文件夹选择对话框时调用此函数
      function openFolderDialog() {
        dialog.showOpenDialog({
          properties: ['openDirectory']
        }).then(result => {
          if (!result.canceled) {
            // 你可以将路径发送到渲染进程或执行其他操作
            try {
              const fileDirPath = result.filePaths[0];
              console.log(getFilesByDirAndFileType(fileDirPath,'mp3'),'xxxx')
                const buffer = fs.readFileSync(fileDirPath+'\\1.mp3');
                const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
                // data是音频文件的Buffer
                // 处理音频Buffer...
                mainWindow.webContents.send('get-file', arrayBuffer);
              } catch (err) {
                console.error(err);
              }
          }
        }).catch(err => {
          console.error(err);
        });
      }
}