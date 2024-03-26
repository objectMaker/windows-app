const {ipcRendererSend,onGetFileList} = (window as any).electron
import {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
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

  useEffect(()=>{
    //初次进来注册事件，只会执行一次注册
    onGetFileList('get-file-list',async (_event:any, value:any) => {
      const setV = 'atom:///' + value
      console.log(setV)
      setFileList('atom:///C:/Users/yu/Desktop/songs/1.mp3')
    })
  },[])
    return (
        <>
        <div className='flex flex-row h-3 item w-full justify-end'>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleOpenFolder()}>e</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleMinimize()}>-</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleClose()}>x</div>
        </div>
        <div>{fileList}</div>
        {fileList && <ReactPlayer url={fileList} playing />}
        </>
    )
  }