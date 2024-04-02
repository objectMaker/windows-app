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
      function getSubtitleFile(lang:'en'|'zh-CN',suffix:'srt'|'vvt'){
        const subtitlePath = file.path.replace(path.extname(file.path), `.${lang}.${suffix}`);
        if(fs.existsSync(subtitlePath)){
          return fs.readFileSync(subtitlePath,'utf-8');
        }
      }
      const cnSubtitle = getSubtitleFile('zh-CN','srt') || getSubtitleFile('zh-CN','vvt');
      const enSubtitle = getSubtitleFile('en','srt') || getSubtitleFile('en','vvt');
      
      function parseFileString(subtitle?:string){
        if(!subtitle){
          return []
        }
        return parseSync(subtitle).map(( item:any)=>({
          start:item.data.start/1000,
          end:item.data.end/1000,
          text:item.data.text.replace(/<[^>]*>/g, '')
        }))
      }
      const subtitleMap = {
        cnSubtitle:parseFileString(cnSubtitle),
        enSubtitle:parseFileString(enSubtitle)
      }

      event.reply('get-subtitle', subtitleMap); 

    });
    let timer:NodeJS.Timeout;
    ipcMain.on('drag',(_,isDrag) => {
     let initH= mainWindow.getSize()[1];
     initH=  initH>+process.env.BORDER_EDGE?+process.env.CLIENT_MAX_HEIGHT:+process.env.CLIENT_MIN_HEIGHT;
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
        width:+process.env.CLIENT_WIDTH,
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