import { useContext } from 'react'
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
    const { fileList }: { fileList: FileListItem[] } = useContext(GlobalContext)
    return <div className="h-[100px] overflow-y-scroll">
        {
            fileList.map((file) =>
                <div className="rounded flex align-middle p-1 m-1 transition-all h-8  hover:text-white border-solid border-blue-500 border-spacing-1 hover:bg-rose-500" key={file.name}>{file.name}</div>
            )
        }
    </div>
}