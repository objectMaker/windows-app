export type FileListItem = {
    path:string,
    size:string,
    uid:string,
    basename:string,
    extname:string,
    name:string
}
export default function({fileList}:{
    fileList:FileListItem[]
}){
    return <div className="h-[100px] overflow-y-scroll">
        {
            fileList.map((file)=>
            <div className="h-[20px] text-yellow-400">{file.name}</div>
            )
        }
    </div>
}