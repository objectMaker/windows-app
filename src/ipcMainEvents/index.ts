import { app, dialog, ipcMain,screen } from 'electron';
import fs from 'fs';
import path from 'path';

import {getFilesByDirAndFileType} from '../utils'
import { parseSync } from 'subtitle';
export default function(mainWindow: Electron.BrowserWindow){
    ipcMain.on('close-app', () => {
        app.quit();
    });
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });
    //注册事件
    ipcMain.on('open-folder', openFolderDialog);
    ipcMain.on('choose-file', (event,file:{path:string})=>{
      const buffer = fs.readFileSync(file.path);
      path.extname(file.path);
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      mainWindow.webContents.send('get-file', arrayBuffer);
      mainWindow.webContents.send('get-current-file-info', file);
      console.log(file.path,'file.path')
      const subtitlePathSrt = file.path.replace(path.extname(file.path), '.en.srt');
      const subtitlePathVvt = file.path.replace(path.extname(file.path), '.en.vvt');
      console.log(subtitlePathSrt,'x')
      console.log(subtitlePathVvt,'y')
      console.log(fs.existsSync(subtitlePathSrt),'z')
      console.log(fs.existsSync(subtitlePathVvt),'a')
      let input;
      if(fs.existsSync(subtitlePathSrt)){
         input = fs.readFileSync(subtitlePathSrt,'utf-8');
      }else if(fs.existsSync(subtitlePathVvt)){
        input = fs.readFileSync(subtitlePathVvt,'utf-8');
      }
      if(!input){
        return ;
      }
      event.reply('get-subtitle', parseSync(input)); 

    });
    let timer:NodeJS.Timeout;
    const [initW,initH] = mainWindow.getSize();
    ipcMain.on('drag',(_,isDrag) => {
      console.log(initW,initH,'wh')
      if(!isDrag){
        return clearInterval(timer);
      }
      //如果是拖拽
     const [startX,startY] = mainWindow.getPosition()
     const {x,y} = screen.getCursorScreenPoint()

     const disX = x-startX; 
     const disY = y-startY; 
     //initWidth height
     clearInterval(timer);
     const {x:clickInitX,y:clickInitY} = screen.getCursorScreenPoint()
    timer = setInterval(()=>{
      const {x,y} = screen.getCursorScreenPoint()
      //点击时触发偏移很小不用移动
        if(Math.abs(clickInitX-x)<=6 && Math.abs(clickInitY-y)<=6){
          return;
      }
      mainWindow.setBounds({
        x:x-disX,
        y:y-disY,
        width:initW,
        height:initH
      })
      },3);
  })
      // 当需要弹出文件夹选择对话框时调用此函数
      function openFolderDialog() {
        dialog.showOpenDialog({
          properties: ['openDirectory']
        }).then(async result => {
          if (!result.canceled) {
            // 你可以将路径发送到渲染进程或执行其他操作
            try {
              const fileDirPath = result.filePaths[0];
                const fileList = await getFilesByDirAndFileType(fileDirPath,'mp3');
                mainWindow.webContents.send('get-file-list', fileList);
              } catch (err) {
                console.error(err);
              }
          }
        }).catch(err => {
          console.error(err);
        });
      }
}