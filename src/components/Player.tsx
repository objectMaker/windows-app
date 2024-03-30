import { useContext, useRef, useState,useCallback, useEffect } from "react";
import ReactDOM from 'react-dom'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { GlobalContext } from "../context";
import { useActivate, useUnactivate } from "react-activation";
import pubSub from 'pubsub-js'
import {SUBTITLE_EVENT} from '../constant'
import { formatDuration } from "../browserUtils";



export default function player() {
    const [reactPlayerProps, setReactPlayerProps] = useState<ReactPlayerProps>({
        playing: false,
        loop: true,
        progressInterval: 50,
        stopOnUnmount: false,
        pip:true,
    })

    // const  [canSetLocalPlayed,setCanSetLocalPlayed] = useState(false);
    const { audioLink,currentFileInfo} = useContext(GlobalContext);

    const [fifteenSecondsPlayed, setFifteenSecondsPlayed] = useState(0);
    const [isMoveProgressIndicator, setIsMoveProgressIndicator] = useState(false);
    const [canSet,setCanSet] = useState(false);
    const [needReset,setNeedReset] = useState(false);
    const [timer,SetTimer] = useState<any>();
    // const [videoDom,setVideoDom] = useState<any>();
    useUnactivate(()=>{
        if(!reactPlayerProps.playing){
            return;
        }
        const video = document.querySelector('#react-player')?.querySelector('video');
        // setVideoDom(video)
        SetTimer(setInterval(()=>{
            // playerRef.current.
            if (video.readyState >= 3) {  
                const currentTime = video.currentTime;  
                const duration = video.duration;  
                const played = (currentTime / duration) 
                console.log('当前播放百分比:', played.toFixed(2));  
                 currentFileInfo.ino &&  localStorage.setItem(currentFileInfo.ino,JSON.stringify({played}))

            } else {  
                console.log('视频元数据尚未加载，无法计算播放百分比。');  
            }
        },50))
        setCanSet(false)
    })
    useActivate(()=>{
        clearInterval(timer)
    })
    const handleProgress = useCallback((params: any) => {
        if(!canSet){
            return;
        }
        const playInfo =  localStorage.getItem(currentFileInfo.ino)
        if(playInfo && needReset){
            const {played} =  JSON.parse(playInfo)
            setNeedReset(false)
            return playerRef.current.seekTo(played)
        }
        //开始播放了，然后从localStorage里面尝试获取
        currentFileInfo.ino &&  localStorage.setItem(currentFileInfo.ino,JSON.stringify({played:params.played}))
        pubSub.publish(SUBTITLE_EVENT,params)
        setTotalTime(formatDuration(params.loadedSeconds))
        setTotalSecondsTime(params.loadedSeconds)
        setFifteenSecondsPlayed(15 / params.loadedSeconds);
        //如果是在拖动，进度条和时间只能根据手拖动的位置进行计算
        if (!isMoveProgressIndicator) {
            setPlayedTime(formatDuration(params.playedSeconds))
            setPlayed(params.played)
        }
    },[canSet,needReset,currentFileInfo,isMoveProgressIndicator])
    const [playedTime, setPlayedTime] = useState('00:00:00')
    const [totalTime, setTotalTime] = useState('00:00:00')
    const [secondsTime, setTotalSecondsTime] = useState(0)
    const [played, setPlayed] = useState(0)

    const progressIndicatorTotalRef = useRef<HTMLDivElement>()
    // const progressIndicatorCurrentRef = useRef<HTMLDivElement>()
    const playerRef = useRef<ReactPlayer>(null);


    console.log(currentFileInfo,'currentFileinfo')
    function handleUpdateReactPlayerProps(params: Partial<ReactPlayerProps>) {
        setReactPlayerProps((prevProps) => ({ ...prevProps, ...params }))
    }

    function handleIndicatorTotalMouseUp() {
        setIsMoveProgressIndicator(false)
        playerRef.current.seekTo(played)
    }
    function handleIndicatorTotalMouseDown() {
        setIsMoveProgressIndicator(true)
    }
    function handlePlayedChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayedTime(formatDuration(+e.target.value * secondsTime))
        setPlayed(+e.target.value)
    }
    function handleChangeFifteenSeconds(isBack?: boolean) {
        if (isBack) {
            playerRef.current.seekTo(Math.max(played - fifteenSecondsPlayed, 0))
        } else {
            playerRef.current.seekTo(Math.min(played + fifteenSecondsPlayed, 0.999999))
        }
    }
    // document.remove
    function reInitPlayed(){
        if(!audioLink){
            return;
        }
        if(!playerRef.current){
            return;
        }
        try{
            const playInfo =  localStorage.getItem(currentFileInfo.ino)
            // const isPlaying = localStorage.getItem('isPlaying')
              if(playInfo){
                  const {played} = JSON.parse(playInfo)
                 if(!playerRef.current.getCurrentTime() && played){
                    setNeedReset(true)
                 }else{
                    setNeedReset(false)
                 }
                    // handleUpdateReactPlayerProps({
                    //     playing:!!isPlaying,
                    // })
                    // playerRef.current.seekTo(played)
              }else{
                  setNeedReset(false)
              }
          }catch(e){
              console.log(e,'获取当前对象时间报错')
          }
          setCanSet(true)
        //   videoDom
    }
    useEffect(()=>{
        reInitPlayed()
    },[audioLink,playerRef.current])

    return <>
        {audioLink &&
            ReactDOM.createPortal(
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    <ReactPlayer id="react-player" {...reactPlayerProps} width={0} height={0} ref={playerRef} url={audioLink} onProgress={handleProgress} />
                </div>,
                document.body
            )}
        <div className="flex w-[30rem] rounded-lg bg-gray-50 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
            <div className="flex items-center space-x-2 px-6 py-0">
                <svg className="h-6 w-6 flex-none scale-75" fill="none" onClick={() => handleChangeFifteenSeconds(true)}>
                    <path d="M6.22 11.03a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM3 6.75l-.53-.53a.75.75 0 0 0 0 1.06L3 6.75Zm4.28-3.22a.75.75 0 0 0-1.06-1.06l1.06 1.06ZM13.5 18a.75.75 0 0 0 0 1.5V18ZM7.28 9.97 3.53 6.22 2.47 7.28l3.75 3.75 1.06-1.06ZM3.53 7.28l3.75-3.75-1.06-1.06-3.75 3.75 1.06 1.06Zm16.72 5.47c0 2.9-2.35 5.25-5.25 5.25v1.5a6.75 6.75 0 0 0 6.75-6.75h-1.5ZM15 7.5c2.9 0 5.25 2.35 5.25 5.25h1.5A6.75 6.75 0 0 0 15 6v1.5ZM15 6H3v1.5h12V6Zm0 12h-1.5v1.5H15V18Z" fill="#64748B"></path>
                    <path d="M3 15.75h.75V21" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9 16.5A.75.75 0 0 0 9 15v1.5Zm-2.25-.75V15a.75.75 0 0 0-.75.75h.75Zm0 2.25H6c0 .414.336.75.75.75V18Zm0 2.25a.75.75 0 0 0 0 1.5v-1.5ZM9 15H6.75v1.5H9V15Zm-3 .75V18h1.5v-2.25H6Zm.75 3h1.5v-1.5h-1.5v1.5Zm1.5 1.5h-1.5v1.5h1.5v-1.5ZM9 19.5a.75.75 0 0 1-.75.75v1.5a2.25 2.25 0 0 0 2.25-2.25H9Zm-.75-.75a.75.75 0 0 1 .75.75h1.5a2.25 2.25 0 0 0-2.25-2.25v1.5Z" fill="#64748B">
                    </path>
                </svg>
                <span onClick={() => handleUpdateReactPlayerProps({ playing: !reactPlayerProps.playing })}>
                    {reactPlayerProps.playing ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>}
                </span>
                <svg className="h-6 w-6 flex-none scale-75" fill="none" onClick={() => handleChangeFifteenSeconds()}>
                    <path d="M16.72 9.97a.75.75 0 1 0 1.06 1.06l-1.06-1.06ZM21 6.75l.53.53a.75.75 0 0 0 0-1.06l-.53.53Zm-3.22-4.28a.75.75 0 1 0-1.06 1.06l1.06-1.06ZM10.5 19.5a.75.75 0 0 0 0-1.5v1.5Zm3.75-4.5a.75.75 0 0 0 0 1.5V15Zm.75.75h.75A.75.75 0 0 0 15 15v.75ZM14.25 21a.75.75 0 0 0 1.5 0h-1.5Zm6-4.5a.75.75 0 0 0 0-1.5v1.5ZM18 15.75V15a.75.75 0 0 0-.75.75H18ZM18 18h-.75c0 .414.336.75.75.75V18Zm0 2.25a.75.75 0 0 0 0 1.5v-1.5Zm-.22-9.22 3.75-3.75-1.06-1.06-3.75 3.75 1.06 1.06Zm3.75-4.81-3.75-3.75-1.06 1.06 3.75 3.75 1.06-1.06ZM2.25 12.75A6.75 6.75 0 0 0 9 19.5V18a5.25 5.25 0 0 1-5.25-5.25h-1.5ZM9 6a6.75 6.75 0 0 0-6.75 6.75h1.5C3.75 9.85 6.1 7.5 9 7.5V6Zm0 1.5h12V6H9v1.5Zm0 12h1.5V18H9v1.5Zm5.25-3H15V15h-.75v1.5Zm0-.75V21h1.5v-5.25h-1.5Zm6-.75H18v1.5h2.25V15Zm-3 .75V18h1.5v-2.25h-1.5Zm.75 3h1.5v-1.5H18v1.5Zm1.5 1.5H18v1.5h1.5v-1.5Zm.75-.75a.75.75 0 0 1-.75.75v1.5a2.25 2.25 0 0 0 2.25-2.25h-1.5Zm-.75-.75a.75.75 0 0 1 .75.75h1.5a2.25 2.25 0 0 0-2.25-2.25v1.5Z" fill="#64748B"></path></svg></div><div className="flex flex-auto items-center border-l border-slate-200/60 pl-6 pr-4 text-[0.8125rem] leading-5 text-slate-700">
                <div>{playedTime}</div>
                <div className="ml-4 flex flex-auto rounded-full bg-slate-100" ref={progressIndicatorTotalRef}
                    onMouseUp={handleIndicatorTotalMouseUp}
                    onMouseDown={handleIndicatorTotalMouseDown}
                >
                    <input onMouseUp={handleIndicatorTotalMouseUp}
                        onMouseDown={handleIndicatorTotalMouseDown} type="range" min="0" max="0.999999" step="any" value={played} className="w-full" onChange={handlePlayedChange}></input>
                    {/* <div className={`h-2 w-0 flex-none rounded-l-full rounded-r-[1px] bg-indigo-600`} style={{ width: percent }} ref={progressIndicatorCurrentRef}></div>
                        <div className="-my-[0.3125rem] ml-0.5 h-[1.125rem] w-1 rounded-full bg-indigo-600"></div> */}
                </div>
                <div className="ml-4">{totalTime}</div>
            </div>
        </div>
    </>
}