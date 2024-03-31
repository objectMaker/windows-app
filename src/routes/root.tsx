import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"
import {GlobalContext} from '../context'
import { STATUS } from "../enum";
import { useContext } from "react";
export default function Root() {
	const { setStatus,status } = useContext(GlobalContext)
	document.addEventListener('mouseenter', () => {
		setStatus(STATUS.NORMAL)
	})
	document.addEventListener('mouseleave', () => {
		setStatus(STATUS.HIDDEN)
	})
  return (<>
    <div className="flex flex-row flex-1 h-full w-full">
      <SideNav></SideNav>
      <div className={`router-wrapper flex-1 h-full  w-full ${status === STATUS.NORMAL?'bg-gray-50':'transparent'}`}>
        <Outlet/>
      </div>
    </div>
  </>)
}