import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import GoBack from "./back";
import Comment from "./Comment";
import GoEdit from "./GoEdit";

export default async function Detail(props) {

    const params = await props.params;
    const id = params.id;

    const db = (await connectDB).db("forum");
    let res = await db.collection('post').findOne({
        _id : new ObjectId(id)})

    return(
        <>
        <GoBack/>
        <div className="p-20">            
            <h3>{res.title}</h3>
            <p>{res.content}</p>
            {/* <Link href={'/edit/'+id}>수정</Link> */}
            <GoEdit id = {id} author = {res.author}/>
        </div>
        <Comment id = {id}/>
        </>
    )
}