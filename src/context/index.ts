import {createContext} from 'react'
import { STATUS } from '../enum'

export const GlobalContext = createContext<{ fileList:any[],
																	setFileList:(...args:any[])=>any,audioLink:string,setAudioLink:(...args:any[])=>any
																	,status:STATUS,setStatus:(...args:any[])=>any
																}>(null)