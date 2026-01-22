'use client'

import { useEffect, useState } from "react"

export default function Comment({ id }) {

    let [comment, setComment] = useState('');
    let [commentList, setCommentList] = useState([]);
    let [btnClick, setBtnClick] = useState(0);

    useEffect(()=>{
        const getComment = async () => {
            try {
                const response = await fetch(`/api/getComment?parent=${id}`, {method : 'GET'})
                const result = await response.json()
                if (response.ok) {
                    setCommentList(JSON.parse(result));
                }
            } catch {
                console.log('네트워크 오류네요.')
            }
        }
        getComment()
    }, [btnClick])

    useEffect(()=>{
        console.log(commentList)
    }, [commentList])

    const deleteComment = async (data) => {
        try {
            const response = await fetch('/api/deleteComment', 
                {method : 'DELETE', 
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify({_id : data._id })})
                const result = await response.json()
            
                if (response.ok) {
                const deletedList = commentList.filter(comments => comments._id != data._id);
                setCommentList(deletedList)
                console.log(result)
                return
            } else {
                alert(result)
                return
            }
            
        } catch (error) {
            alert('네트워크 오류')
        }
    }

    return(
        <div className="p-20">
            <div>{commentList.length > 0 ? commentList.map((data, idx)=>{
                    return(
                        <div className="comment-list" key={idx}>
                            <p className="comment-author">{data.author}</p>
                            <p className="comment-content">{data.content}</p>
                            <span onClick={()=>{deleteComment(data)}}
                            className="comment-delete">삭제🗑️</span>
                        </div>
                    )
            }) : <div className="comment-list">아직 댓글이 없네요</div>}</div>
            <input value={comment} onChange={(e)=>{ setComment(e.target.value) }}/>
            <button onClick={async (e)=>{
                const response = await fetch('/api/comment', 
                    {method : 'POST', 
                     body : JSON.stringify({payload : comment, parentId : id})})
                if (response.ok){
                    setComment('')
                    setBtnClick(prev => prev + 1)
                }

            }}
            
            >작성</button>
        </div>
    )
}