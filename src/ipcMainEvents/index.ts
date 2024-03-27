import { app, dialog, ipcMain,screen } from 'electron';
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
    let timer:NodeJS.Timeout;
    ipcMain.on('drag',(_,isDrag) => {
      if(!isDrag){
        return clearInterval(timer);
      }
      //如果是拖拽
     const [startX,startY] = mainWindow.getPosition()
     const {x,y} = screen.getCursorScreenPoint()

     const disX = x-startX; 
     const disY = y-startY; 
     //initWidth height
     const [initW,initH] = mainWindow.getSize();
    timer = setInterval(()=>{
      const {x,y} = screen.getCursorScreenPoint()
      // (x-disX,y-disY,false)
      mainWindow.setBounds({
        x:x-disX,
        y:y-disY,
        width:initW,
        height:initH
      })
      },2);
  })
      // 当需要弹出文件夹选择对话框时调用此函数
      function openFolderDialog() {
        dialog.showOpenDialog({
          properties: ['openDirectory']
        }).then(result => {
          if (!result.canceled) {
            // 你可以将路径发送到渲染进程或执行其他操作
            try {
              const fileDirPath = result.filePaths[0];
                const fileList = getFilesByDirAndFileType(fileDirPath,'mp3');
                mainWindow.webContents.send('get-file-list', fileList);

                const buffer = fs.readFileSync(fileDirPath+'\\1.mp3');
                const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
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