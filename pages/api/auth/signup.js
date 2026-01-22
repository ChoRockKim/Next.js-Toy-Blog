import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res){
    
    const body = JSON.parse(req.body)

    if (req.method == 'POST') {

        if (body.name == '') {
            return res.status(500).json('이름을 입력하셔야죠')
        }
        if (body.email == '') {
            return res.status(500).json('이메일을 입력 안 함')
        }

        if (body.password == '') {
            return res.status(500).json('비밀번호를 입력 안 함')
        }

        let hash = await bcrypt.hash(body.password, 10)
        body.password = hash;

        let db = (await connectDB).db('forum');
        
        const isExistEmail = await db.collection('user').findOne({ email : body.email});

        if (isExistEmail) {
            return res.status(500).json('이미 존재하는 이메일입니다.')
        } 
        else {
            await db.collection('user').insertOne(body);
            return res.status(200).json('가입성공')

        }
    }
}