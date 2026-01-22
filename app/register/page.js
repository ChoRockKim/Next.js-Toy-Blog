'use client'

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);
    console.log(body)
    
    try {
      const response = await fetch('/api/auth/signup', {
        method : 'POST',
        body : JSON.stringify(body)
      })

      const result = await response.json();
      
      if (response.ok) {
        alert(result)
        router.push('/')
        
      } else {
        alert(result)
        return
      }
      
    } catch (error) {
        alert('네트워크 오류')
    }
  }

  return (
    <div className="p-20">
        <form onSubmit={(e)=>{handleSubmit(e)}}
         method="POST" action="/api/auth/signup">
          <input name="name" type="text" placeholder="이름" /> 
          <input name="email" type="text" placeholder="이메일" />
          <input name="password" type="password" placeholder="비번" />
          <button type="submit">id/pw 가입요청</button>
        </form>
    </div>
  )
}