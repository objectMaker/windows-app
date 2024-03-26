// @ts-nocheck
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//@ts-ignore
console.log(global,'global')
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
  ipcRendererSend: function (channel, data) {
    ipcRenderer.send(channel, data);
  },
  onGetFileList: function (channel,callback) {
    ipcRenderer.on('get-file-list', (_event, value) => {
      // fs.readFile(value+'\\1.mp3', 'utf8', function (err, data) {
        
      // }
      // 如果想要同步读取，可以使用以下代码
callback(_event,value)
    } )
  },
});
