import  React,{useState,useEffect} from 'react'
import { GlobalContext } from './';

export default function(props:{children:React.ReactNode}){
	const [fileList,setFileList] = useState([])
	localStorage.setItem('fileList',JSON.stringify(fileList))
	useEffect(()=>{
		let fileList:any;
		try{
			console.log(localStorage.getItem('fileList'),'ddddd')
			fileList =JSON.parse(localStorage.getItem('fileList'))
			console.log('fileList',fileList)
		}finally{
			setFileList(fileList || [])
		}
	},[])
		useEffect(()=>{
		localStorage.setItem('fileList',JSON.stringify(fileList))
		},[fileList])
	return <GlobalContext.Provider value={{fileList,setFileList}}>
			{props.children}
	</GlobalContext.Provider>
}