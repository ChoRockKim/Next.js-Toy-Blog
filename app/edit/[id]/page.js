import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function Edit(props) {

    const params = await props.params;
    const id = params.id;


    const db = (await connectDB).db("forum");
    let res = await db.collection('post').findOne({
        _id : new ObjectId(id)})

    await db.collection('post').updateOne({}, {$set : {}})
        

    console.log(res)
    return(
        <div className="p-20">
            <h4>글 수정</h4>
            <form action="/api/edit" method="POST">
                <input name="title" placeholder="글제목" defaultValue={res.title}></input><br></br>
                <input name="content" placeholder="글내용" defaultValue={res.content}></input>
                <input type="hidden" name="_id" defaultValue={id}></input>
                <button type="submit">수정</button>
            </form>
            <br/>

        </div>
    )
}