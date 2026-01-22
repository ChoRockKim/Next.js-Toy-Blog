'use client'

import Posts from "./Posts"

export default function ListItem({ res }) {
    

    return(
        <div className="list-bg">
            {res.map((data, idx)=>{
                const _id = data._id
                return (<Posts 
                        title = {data.title} _id = {_id} 
                        data = {data} key={idx} />)
            })}
        </div>
    )
}