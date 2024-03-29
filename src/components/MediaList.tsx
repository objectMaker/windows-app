import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const { ipcRendererSend} = (window as any).electron
import { GlobalContext } from '../context'
export type FileListItem = {
    path: string,
    size: string,
    uid: string,
    basename: string,
    extname: string,
    name: string
}

export default function () {
    const nav = useNavigate()
    const { fileList }: { fileList: FileListItem[] } = useContext(GlobalContext)
    return <div className="h-[100px] overflow-y-scroll">
        {
            fileList.map((file) =>
                <div className="rounded flex align-middle p-1 m-2 transition-all h-8 bg-gray-200  hover:text-white border-solid border-blue-500 border-spacing-1 hover:bg-rose-500" key={file.name}
                onClick={() =>{
                    ipcRendererSend('choose-file', file)
                    nav('/player')
                }}
                
                >{file.name}</div>
            )
        }
    </div>
}