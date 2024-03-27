// @ts-nocheck
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//@ts-ignore
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
  ipcRendererSend: function (channel, data) {
    ipcRenderer.send(channel, data);
  },
  onGetFileList: function (_,callback) {
    ipcRenderer.on('get-file-list', (e,v)=>callback(e,v))
  },
});
