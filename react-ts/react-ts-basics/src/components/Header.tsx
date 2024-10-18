import { type PropsWithChildren } from "react";

type HeaderImage = {src: string; alt:string;}

type HeaderProps = PropsWithChildren<{image: HeaderImage}>;

export default function Header({image, children}:HeaderProps){
    return(
        <header>
            <img {...image}></img>
            {children}
        </header>
    );
}