import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'

export default async function List() {

    const db = (await connectDB).db("forum");
    let res = await db.collection('post').find().toArray();

    res = res.map((data)=>{
        data._id = data._id.toString();
        return (data)
    })

    return (
        <ListItem res={res}/>
    )
} 