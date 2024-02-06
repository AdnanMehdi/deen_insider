import Mongoose from '../../helpers/mongoose'
import Blog from '../../models/blog'

Mongoose()

export default async (req,res)=>{
    Blog.find().sort({_id:-1}).then(blogs=>{
        res.status(200).json(blogs)
    })
}