import pubSub from 'pubsub-js'
import { useContext,useEffect, useState } from "react"
import { GlobalContext } from "../context"
import {SUBTITLE_EVENT} from '../constant'
export default function(){
	const {subtitle} = useContext(GlobalContext)
	const [letter,setLetter] = useState('')
	useEffect(() => {
		pubSub.subscribe(SUBTITLE_EVENT,(params:any)=>{
	console.log('xxx',params)
		})
		return ()=>{
			console.log('un');
            pubSub.unsubscribe(SUBTITLE_EVENT)
		}
	},[])
	return <>
		{subtitle && <div>letter</div>}
		{<div>显示的字母</div>}
	</>	
}