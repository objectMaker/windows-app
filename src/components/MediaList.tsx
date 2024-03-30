import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const { ipcRendererSend} = (window as any).electron
import { GlobalContext } from '../context'
import { formatDuration } from '../browserUtils'
export type FileListItem = {
    path: string,
    size: string,
    uid: string,
    basename: string,
    extname: string,
    name: string,
    ino:string,
    metadata:any
}

export default function () {
    const nav = useNavigate()
    const { fileList }: { fileList: FileListItem[] } = useContext(GlobalContext)
    return <div className="h-[100px] overflow-y-scroll w-full overflow-x-hidden text-xs">
        {
            fileList.map((file) =>(
                <div className="flex flex-row px-2 pt-1 items-center w-full h-7" key={file.ino}>
                <div className='flex-1 overflow-hidden h-full'>
                <div className="w-full rounded text-ellipsis whitespace-nowrap overflow-hidden flex align-middle p-1 mb-1 transition-all h-full bg-indigo-100  hover:text-white hover:bg-rose-400" key={file.name}
                title={file.name}
                onClick={() =>{
                    ipcRendererSend('choose-file', file)
                    nav('/player')
                }}
                >{file.name}</div>
                </div>
                <div className=' w-13 ml-1 p-1 flex h-full text-center justify-end align-middle'>{formatDuration(file.metadata.format.duration)}</div>
                </div>
            )
            )
        }
    </div>
}