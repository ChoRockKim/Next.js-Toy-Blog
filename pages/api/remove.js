import { connectDB } from "@/util/database"
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
    let session = await getServerSession(request, response, authOptions)

    if (request.method == 'DELETE') {
        const db = (await connectDB).db('forum');
        const post = await db.collection('post').findOne({ _id : new ObjectId(request.body)})
        const author = post.author;

        // console.log('이게 이 글 쓴 사람 정보임!!!!!!', author)

        if ((author != null && author == session?.user.email) || session?.user.role == 'admin') {
            const result = await db.collection('post').deleteOne({_id : new ObjectId(request.body)})
            const comments = await db.collection('comment').deleteMany({ parent : new ObjectId(request.body)})
            console.log(result, comments)
            return response.status(200).json('삭제완료')
        } else {
            return response.status(401).json('당신의 게시글이 아닙니다.')
        }

    }

}