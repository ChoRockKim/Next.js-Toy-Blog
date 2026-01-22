'use client'

import { useRouter } from "next/navigation"

export default function GoEdit({ id, author }) {
    const router = useRouter()

    const getAuthorInfo = async () => {
        try {
            const response = await fetch('/api/getAuthorInfo', 
                                        {method : 'GET'})
            const result = await response.json()
            
            if (response.ok) {
                if (result == author) {
                    return router.push('/edit/' + id)

                } else {
                    alert('당신이 쓴 글이 아닌데요')
                }

                return result 
            } else {
                alert(result)
                return result
            }

        } catch (error) {
            alert('네트워크 오류')
            return
        }
        
    }

    return (
        <span style={{cursor : 'pointer', fontSize : '13px'}}
        onClick={()=>{getAuthorInfo()}}
        >글 수정</span>
    )
}