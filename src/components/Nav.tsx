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
      console.log(value,'value')
     // 创建一个Blob对象  
    const audioBlob = new Blob([value], { type: 'audio/wav' }); // 或者使用其他适当的MIME类型  
    console.log(audioBlob,'audioBlobaudioBlob')
    console.log(URL.createObjectURL(audioBlob),'URL.createObjectURL(audioBlob)')
    // 现在你可以使用audioBlob了，比如创建一个URL来播放它  
    const setV = URL.createObjectURL(audioBlob);  
      setFileList(setV)
    })
  },[])
    return (
        <>
        <div className='flex flex-row h-3 item w-full justify-end'>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleOpenFolder()}>e</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleMinimize()}>-</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleClose()}>x</div>
        </div>
        {fileList && <audio controls   src={fileList}/>}
        </>
    )
  }