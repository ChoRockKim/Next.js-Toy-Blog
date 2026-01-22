import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (req.method == 'DELETE') {
        const db = (await connectDB).db('forum');
        const comment = await db.collection('comment').findOne({_id : new ObjectId(req.body._id)});
        
        if ((session != null && session?.user.email == comment.author) || session?.user.role == 'admin') {
            const deletedComment = await db.collection('comment').deleteOne({ _id : new ObjectId(req.body._id)});
            console.log(deletedComment)
            return res.status(200).json('삭제 잘했음')
        } 
        // console.log(req.body, session, comment)
        return res.status(500).json('삭제 권한이 없습니다')
    }
}