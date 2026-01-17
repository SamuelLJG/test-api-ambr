import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return <header>
        <Image width={30} height={30} src="/logo.svg" alt=""/>
    </header>
}