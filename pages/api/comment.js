import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";


export default async function handler(req, res){
    
    const session = await getServerSession(req, res, authOptions)
    
    if (req.method == 'POST') {
        // const db = (await connectDB).db('forum');
        // const comment = await db.collection('comment').insetOne()
        const data = JSON.parse(req.body);
        
        if (session == null) {
            return res.status(500).json('로그인을 안 하셨군요')
        }
        const c_data = {content : data?.payload, 
                        author : session?.user.email, 
                        parent : new ObjectId(data.parentId)};

        const db = (await connectDB).db('forum');
        
        try {
            const comment = await db.collection('comment').insertOne(c_data)
            console.log('당신이 단 댓글 정보', comment)
            return res.status(200).json('댓글 달았습니다!')
        
        } catch (error) {
            console.log('댓글 달기 실패함...')
            return res.status(500).json('댓글 달기 실패...')
        }        
    }
}