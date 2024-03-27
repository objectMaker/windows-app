const {ipcRendererSend,onGetFile} = (window as any).electron
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
  const [audioLink, setAudioLink] = useState('')

  useEffect(()=>{
    //初次进来注册事件，只会执行一次注册
    onGetFile('get-file',async (_event:any, value:any) => {
    const audioBlob = new Blob([value], { type: 'audio/wav' }); // 或者使用其他适当的MIME类型  
      setAudioLink(URL.createObjectURL(audioBlob))
    })
  },[])
  function handleProgress(params:any) {
    console.log(params,'params')
  }
    return (
        <>
        <div className='flex flex-row h-3 item w-full justify-end'>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleOpenFolder()}>e</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleMinimize()}>-</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleClose()}>x</div>
        </div>
        {audioLink && <ReactPlayer  url={audioLink} controls onProgress={handleProgress}/>}
        </>
    )
  }