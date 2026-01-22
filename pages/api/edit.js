import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {

    if (request.method == 'POST') {
        console.log('수정요청:', request.body);

        const db = (await connectDB).db("forum");
        await db.collection('post').updateOne({_id : new ObjectId(request.body._id)}, 
            {$set : {title : request.body.title, content : request.body.content}})

        return response.status(200).redirect('/detail/'+request.body._id)
    }

}