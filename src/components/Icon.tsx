import React from 'react';

export default function Icon({
	children,
	onClick,
	title
}:{
	children:React.ReactNode,
	onClick:(...args:any[])=>any,
	title:string,
}){
	return <div title={title} className='transition hover:bg-sky-400 justify-self-end h-full pb-0.5 pt-0.5 pr-1.5 pl-1.5 items-center flex cursor-pointer' onClick={onClick}>
	{children}
  </div>
}