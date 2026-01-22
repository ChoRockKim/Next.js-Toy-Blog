import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const db = (await connectDB).db('forum');
        const comments = await db.collection('comment').find({parent : new ObjectId(req.query.parent)}).toArray()

        return res.status(200).json(JSON.stringify(comments))
    }

}