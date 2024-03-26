import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';
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
            console.log(result.filePaths[0]); // 输出选中的文件夹路径
            // 你可以将路径发送到渲染进程或执行其他操作

            try {
                const buffer = fs.readFileSync(result.filePaths[0]+'\\countStar.mp3');
                const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
                // data是音频文件的Buffer
                console.log('音频文件同步读取成功');
                console.log(arrayBuffer,'data');
                // 处理音频Buffer...
                mainWindow.webContents.send('get-file-list', arrayBuffer);
              } catch (err) {
                console.error(err);
              }
            //把字符串 \\ 转化为 /
            // const filePath = result.filePaths[0].replace(/\\/g, '/');
            // const filePath = result.filePaths[0]
            //     mainWindow.webContents.send('get-file-list', filePath+'\\countStar.mp3');

          }
        }).catch(err => {
          console.error(err);
        });
      }
}