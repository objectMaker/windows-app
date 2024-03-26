const {ipcRendererSend} = (window as any).electron

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
    return (
        <>
        <div className='flex flex-row h-3 item w-full justify-end'>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleOpenFolder()}>e</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleMinimize()}>-</div>
            <div className='justify-self-end h-full pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={()=>handleClose()}>x</div>
        </div>
        </>
    )
  }