import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    
    const _id = req.query._id
    console.log(_id)

    const db = (await connectDB).db('forum');
    const result = await db.collection('post').deleteOne({_id : new ObjectId(_id)})
    console.log('삭제 함!!')
    return res.status(200).json()
}