import { Outlet } from "react-router-dom";
import MainHeader from "../src/components/MainHeader";

function RootLayout(){
    return(
        <>
            <MainHeader />
            <Outlet />
        </>
    );
}

export default RootLayout;