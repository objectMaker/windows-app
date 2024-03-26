import { app, dialog, ipcMain } from 'electron';


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
            mainWindow.webContents.send('get-file-list', result.filePaths[0]);
          }
        }).catch(err => {
          console.error(err);
        });
      }
}