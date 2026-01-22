import { connectDB } from "@/util/database";

export const revalidate = 60;

export default async function Home() {  
  const db = (await connectDB).db("forum");
  let res = await db.collection('post').find().toArray();

  console.log(res);

  // await fetch('/URL', {cache : 'force-cache', next : {revalidate : 60}})

  return (
    <div className="p-20">초록 블로그입니다. 리스트 클릭!</div>
  );
}
