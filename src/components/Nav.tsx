const { ipcRendererSend, onGetFile, onGetFileList,onGetCurrentFileInfo,onGetSubtitle } = (window as any).electron
import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context'
import Icon from './Icon'
import { STATUS } from '../enum'
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


export default function Nav() {

  const { setFileList, setAudioLink, status,setCurrentFileInfo,setSubtitle } = useContext(GlobalContext);

  // const [isClick, setClick] = useState(false)

  useEffect(() => {
    //初次进来注册事件，只会执行一次注册
    onGetFile('get-file', async (_event: any, value: any) => {
      const audioBlob = new Blob([value], { type: 'audio/wav' }); // 或者使用其他适当的MIME类型  
      setAudioLink(URL.createObjectURL(audioBlob))
    })
    onGetSubtitle('get-subtitle', async (_event: any, value: any) => {
        setSubtitle(value)
    })
    onGetCurrentFileInfo('get-current-file-info', async (_event: any, value: any) => {
      setCurrentFileInfo(value)
    })
    onGetFileList('get-file-list', (e: any, v: any) => {
       v.sort((pre:any,current:any)=>{
        const currentCount = +current.name.split('.')[0]
        const preCount = +pre.name.split('.')[0]
        return  preCount - currentCount
      })
      setFileList(v)
    })
    const dragFalse = () => {
      // setClick(false)
      ipcRendererSend('drag', false)
    }
    document.body.addEventListener('mouseup', dragFalse)
    return () => {
      document.body.removeEventListener('mouseup', dragFalse)
    }
  }, [])





  //拖动事件处理
  function handleMouseDown() {
    // setClick(true)
    ipcRendererSend('drag', true)
  }
  function handleMouseUp() {
    // setClick(false)
    ipcRendererSend('drag', false)
  }

  return (
    <>
      <div
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
        style={status === STATUS.NORMAL ? {
        } : { visibility: 'hidden' }}
        id="nav" className='transition flex flex-row h-5 item w-full justify-end bg-blue-400 shadow-lg'>

        <Icon title="选择播放文件夹" onClick={() => handleOpenFolder()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentcolor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
          </svg>
        </Icon>
        <Icon title="最小化" onClick={() => handleMinimize()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentcolor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </Icon>

        <Icon title="关闭" onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentcolor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </Icon>
      </div >
    </>
  )
}