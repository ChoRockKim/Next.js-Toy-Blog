'use client'

import { useRouter } from "next/navigation";

export default function Posts({ _id, title, data }) {
    const router = useRouter();


    return(
        <>
        <div className="list-item">
            <h4 onClick={()=>{router.push('/detail/' + _id)}}>
                {title}</h4>
            <p>{data.author}</p>
            <span onClick={(e)=> {
                fetch('/api/remove', {
                    method : 'DELETE',
                    body : _id
                })
                .then((r)=>{
                    if (r.ok) {
                        return r.json();
                    } else {
                        alert('삭제 권한이 없습니다.')
                        throw new Error('삭제 권한이 없습니다.')
                    }
                })
                .then((result)=>{    
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(()=>{
                        e.target.parentElement.style.display = 'none';
                    }, 1000)
                })
                
                .catch(error => {
                    //네트워크 오류
                })
                
                // fetch('/api/test2/?_id='+_id)

            }}>삭제🗑️</span>
        </div>
        </>
    );
}