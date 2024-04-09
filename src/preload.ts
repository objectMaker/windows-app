// @ts-nocheck
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//@ts-ignore
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
  ipcRendererSend: function (channel, data) {
    ipcRenderer.send(channel, data);
  },
  onGetFile: function (_,callback) {
    ipcRenderer.on('get-file', (e,v)=>callback(e,v))
  },
  onGetSubtitle: function (_,callback) {
    ipcRenderer.on('get-subtitle', (e,v)=>callback(e,v))
  },
  onGetCurrentFileInfo: function (_,callback) {
    ipcRenderer.on('get-current-file-info', (e,v)=>callback(e,v))
  },
  onGetFileList: function (_,callback) {
    ipcRenderer.on('get-file-list', (e,v)=>callback(e,v))
  },
  onTogglePlayerPause: function (_,callback) {
    ipcRenderer.removeAllListeners('toggle-player-pause')
    ipcRenderer.on('toggle-player-pause', (e,v)=>callback(e,v))
  },
  onBack: function (_,callback) {
    ipcRenderer.removeAllListeners('back')
    ipcRenderer.on('back', (e,v)=>callback(e,v))
  },
  onGo: function (_,callback) {
    ipcRenderer.removeAllListeners('go')
    ipcRenderer.on('go', (e,v)=>callback(e,v))
  },
});
