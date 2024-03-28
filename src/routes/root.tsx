import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"

export default function Root() {

  return (<>
    <div className="flex flex-row flex-1 h-full">
      <SideNav></SideNav>
      <div className="router-wrapper flex-1 h-full bg-gray-50">
        <Outlet />
      </div>
    </div>
  </>)
}