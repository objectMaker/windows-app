import  React,{useState,useEffect} from 'react'
import { GlobalContext } from './';
import { STATUS } from '../enum';

export default function(props:{children:React.ReactNode}){
	const [fileList,setFileList] = useState([])
	const [audioLink, setAudioLink] = useState('')
	const [subtitle, setSubtitle] = useState(null)
	const [status, setStatus] = useState(STATUS.NORMAL)
	const [currentFileInfo, setCurrentFileInfo] = useState({})
	useEffect(()=>{
		let fileList:any;
		try{
			fileList =JSON.parse(localStorage.getItem('fileList'))
			console.log('fileList',fileList)
		}finally{
			setFileList(fileList || [])
		}
	},[])
		useEffect(()=>{
		localStorage.setItem('fileList',JSON.stringify(fileList))
		},[fileList])
	return <GlobalContext.Provider value={{fileList,setFileList,audioLink,setAudioLink,status,setStatus,currentFileInfo,setCurrentFileInfo,subtitle,setSubtitle
	}}>
			{props.children}
	</GlobalContext.Provider>
}