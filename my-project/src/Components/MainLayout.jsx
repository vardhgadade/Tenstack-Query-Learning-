import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router-dom"

export const MainLayout=()=>{
    return(
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}