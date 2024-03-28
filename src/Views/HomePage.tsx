import Nav from "../components/Nav";
import MediaList from "../components/MediaList";
import Player from "../components/Player";
import { GlobalContext } from '../context';
import { STATUS } from '../enum';
import { useContext } from 'react';

export default function HomePage() {
	const { setStatus } = useContext(GlobalContext)
	document.addEventListener('mouseenter', () => {
		setStatus(STATUS.NORMAL)
	})
	document.addEventListener('mouseleave', () => {
		setStatus(STATUS.HIDDEN)
	})
	return <>
		<Nav />
		<MediaList />
		<Player />
	</>
}