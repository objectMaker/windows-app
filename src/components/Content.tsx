import SideNav from "./SideNav"
import React from "react"
export default function Content({ children }: { children: React.ReactNode }) {
    return (<>
        <div className="flex flex-row flex-1 h-full">
            <SideNav></SideNav>
            <div className="router-wrapper flex-1 h-full">
                {children}
            </div>
        </div>
    </>)
}