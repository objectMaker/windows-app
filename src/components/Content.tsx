import SideNav from "./SideNav"
import React from "react"
export default function Content({ children }: { children: React.ReactNode }) {
    return (<>
        <div className="flex flex-row flex-1 h-full w-full">
            <SideNav></SideNav>
            <div className="router-wrapper flex-1 h-full flex-grow-0">
                {children}
            </div>
        </div>
    </>)
}