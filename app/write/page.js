import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Write() {
    
    const isLoggedIn = await getServerSession(authOptions)
    
    if (!isLoggedIn) {
        redirect('/api/auth/signin')
    }
    
    return(
        <div className="p-20">
            <h4>글 작성</h4>
            <form action="/api/test" method="POST">
                <input name="title" placeholder="글제목"></input><br></br>
                <input name="content" placeholder="글내용"></input>
                <button type="submit">발행</button>
            </form>
            <br/>
            <form action="/api/test" method="GET">
                <button type="submit">GET</button>
            </form>

        </div>
    )
}