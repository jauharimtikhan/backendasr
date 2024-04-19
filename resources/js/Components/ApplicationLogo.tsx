import { HTMLAttributes } from "react";
import Logo from "./logoasr.png";
export default function ApplicationLogo(
    props: HTMLAttributes<HTMLImageElement>
) {
    return <img src={Logo} alt="Logo Asr Furniture" {...props} />;
}
