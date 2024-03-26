const {ipcRendererSend,onGetFileList} = (window as any).electron
import {useState} from 'react'
// const { ipcRenderer } = window.require("electron");

  function handleClose() {
    ipcRendererSend('close-app')
  }
  function handleMinimize() {
    ipcRendererSend('minimize')
  }

  function handleOpenFolder() {
    ipcRendererSend('open-folder')
  }




export default function Nav(){
  const [fileList, setFileList] = useState('')

  onGetFileList('get-file-list',(_event:any, value:any) => {
    console.log(_event,'eve')
    console.log(value,'ev')
    setFileList(value)
  })
    return (
        <>
        <div className='flex flex-row h-3 item w-full justify-end'>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleOpenFolder()}>e</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleMinimize()}>-</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleClose()}>x</div>
        </div>
        <div>{fileList}</div>
        </>
    )
  }