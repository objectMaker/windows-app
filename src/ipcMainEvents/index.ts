import { app, dialog, ipcMain } from 'electron';
import fs from 'fs'

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

            // try {
            //     const data = fs.readFileSync(result.filePaths[0]+'\\1.mp3');
            //     // data是音频文件的Buffer
            //     console.log('音频文件同步读取成功');
            //     console.log(data,'data');
            //     // 处理音频Buffer...
            //     mainWindow.webContents.send('get-file-list', data);
            //   } catch (err) {
            //     console.error(err);
            //   }
                mainWindow.webContents.send('get-file-list', result.filePaths[0]+'\\1.mp3');

          }
        }).catch(err => {
          console.error(err);
        });
      }
}