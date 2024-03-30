import pubSub from 'pubsub-js'
import {SUBTITLE_EVENT} from '../constant'

import { useContext,useEffect, useState } from "react"
import { GlobalContext } from "../context"
export default function(){
	const {subtitle} = useContext(GlobalContext)
	const [text,setText] = useState('')
	useEffect(() => {
		pubSub.subscribe(SUBTITLE_EVENT,(_,data:any)=>{
			const subtitleItem =  subtitle?.find((item:any)=>item.start<data.playedSeconds&&data.playedSeconds<item.end)
			setText(subtitleItem?.text || '')
		})
		return ()=>{
            pubSub.unsubscribe(SUBTITLE_EVENT)
		}
	},[subtitle])
	return <>
		{subtitle && <div>{text}</div>}
	</>	
}