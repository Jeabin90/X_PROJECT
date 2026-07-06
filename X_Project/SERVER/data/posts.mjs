import MongoDB, { ObjectId, ReturnDocument } from "mongodb"
import * as UserRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"

// 포스트를 작성
export async function create(text, id) {
    return UserRepository.findById(id).then((user) => getPosts().insertOne({
        text, 
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid
    })).then((result) => {
        return getPosts().findOne({ _id: result.insertedId })
    })
}

//모든 포스트를 리턴
export async function getAll(){
    return getPosts().find().sort({createdAt:-1}).toArray()
}

export async function getAllByUserid(userid) {
    return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray()
}
//글번호 포스트를 리턴
export async function getById(id){
    return getPosts().find({ _id:new ObjectId(id) }).next().then(mapOp)
}
// 글번호 포스트 수정 리턴
export async function update(id,text){
    return getPosts().findOneAndUpdate({_id:new ObjectId(id)},{$set: {text: text,}},{returnDocument:'after'}).then((result)=>result)
}
export async function remove(id){
    return getPosts().findOneAndDelete({_id:new ObjectId(id)})
}
function mapOp(post){
    return post ? {...post,id:post._id.toString()}:post
}