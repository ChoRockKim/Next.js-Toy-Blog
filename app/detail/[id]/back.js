'use client'
import { useRouter } from "next/navigation"

export default function GoBack() {

    const router = useRouter();

    return(
        <button style={{marginLeft : '20px'}} onClick={()=>{router.push('/list')}}>뒤로가기</button>
    )
}