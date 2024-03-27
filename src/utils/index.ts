import path from 'path'
import fs from 'fs'
//获取当前一个绝对路径下面的所有文件，通过文件类型过滤
export  function getFilesByDirAndFileType(dir:string,fileType:string|string[]){
    const currentDir = path.normalize(dir);
    const files = fs.readdirSync(currentDir)

   const currentTypeFiles =   files.filter(item=>{
    const currentFileType = path.extname(item).slice(1);
    return  Array.isArray(fileType)?fileType.includes(currentFileType):
    currentFileType === fileType
   })

   const dealFiles = currentTypeFiles.map(item=>{
    const currentPath = path.join(currentDir,item);
    const stat = fs.statSync(currentPath)
    const extname = path.extname(currentPath)
    const basename =  path.basename(currentPath,extname)
        return {
            path:currentPath,
            size:stat.size,
            uid:stat.uid,
            basename,
            extname,
            name:basename+extname
        }
   })
   return dealFiles;
}