import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const middleware = (req: NextRequest) => {
    const checkedUrl = req.nextUrl.pathname
    const roleCookie = Cookies.get('role')
    console.log(roleCookie, "console role")
    console.log(checkedUrl, "<< cek url")

    return NextResponse.next()
}