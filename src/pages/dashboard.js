import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Timeline from "../components/Timeline";

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram'
    })

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-12 gap-4 justify-between mx-auto max-w-desktop">
                <Timeline />
                <Sidebar /> 
            </div>
        </div>
    )
}