import {createContext} from 'react'

export const GlobalContext = createContext<{ fileList:any[],
																	setFileList:(...args:any[])=>any,audioLink:string,setAudioLink:(...args:any[])=>any}>(null)