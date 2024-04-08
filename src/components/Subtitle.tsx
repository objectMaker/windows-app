import pubSub from 'pubsub-js'
import { SUBTITLE_EVENT } from '../constant'

import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context"
export default function () {
	const { subtitle } = useContext(GlobalContext)
	const [textEn, setTextEn] = useState('')
	const [textCn, setTextCn] = useState('')
	const [lang, setLang] = useState('en')
	useEffect(() => {
		pubSub.subscribe(SUBTITLE_EVENT, (_, data: any) => {
			if (!subtitle) {
				return;
			}
			setLang(localStorage.getItem('lang'))
			const subtitleItemEn = subtitle.enSubtitle?.find((item: any) => item.start < data.playedSeconds && data.playedSeconds < item.end)
			setTextEn(subtitleItemEn?.text || '')
			const subtitleItemCn = subtitle.cnSubtitle?.find((item: any) => item.start < data.playedSeconds && data.playedSeconds < item.end)
			setTextCn(subtitleItemCn?.text || '')
		})
		return () => {
			pubSub.unsubscribe(SUBTITLE_EVENT)
		}
	}, [subtitle])
	return <div className=" text-sm" style={{
		color: 'rgba(107,109,31)',
	}}>
		{subtitle?.enSubtitle?.length > 0 && lang !== 'cn' && <div className='w-full h-5 p-1 align-middle'>{textEn}</div>}
		{subtitle?.cnSubtitle?.length > 0 && lang !== 'en' && <div className='w-full h-5 p-1 align-middle'>{textCn}</div>}
	</div>
}