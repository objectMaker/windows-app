import {useContext} from 'react'
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
    const {fileList} :{fileList: FileListItem[]} = useContext(GlobalContext)
    return <div className="h-[100px] overflow-y-scroll">
        {
            fileList.map((file) =>
                <div className="h-[20px] text-yellow-400" key={file.name}>{file.name}</div>
            )
        }
    </div>
}