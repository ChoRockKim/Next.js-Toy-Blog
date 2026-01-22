import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {

    const db = (await connectDB).db("forum");
    let res = await db.collection('post').find().toArray();
    let session = await getServerSession(request, response, authOptions);
    
    if (session) {
        request.body.author = session.user.email
    }

    if (request.method == 'POST') {
        
        if (request.body.title == '' || request.body.content == '') {
            return response.status(500).json('왜 내용 없어')
        }
        
        try {
            db.collection('post').insertOne(request.body)
        } catch (error) {
            console.log('악 실패')
        }

        return response.status(200).redirect('/list')
    }
    if (request.method == 'GET') {
        console.log('GET 요청이네')
        return response.status(200).json({res});
    }

}