'use client'

import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginBtn({ session }) {
    const router = useRouter();
    return (
        <>
        {session == null ? 
        <span><button style={{marginRight : '10px'}}
         onClick={()=>{ signIn() }}>로그인</button>
        <button onClick={()=>{router.push('/register')}} 
        style={{width : '82px'}}>회원가입</button>
        </span>
         : <span>
            <button onClick={()=>{ signOut() }}>로그아웃</button>
            <div>
                로그인 정보: {session.user.name}
            </div>
            <p style={{marginTop : '0', fontSize : '14px'}}
            >{session.user.email}</p>
         </span>}
        </>
    )
}