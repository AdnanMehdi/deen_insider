import Mongoose from '../../helpers/mongoose'
import Video from '../../models/video'

Mongoose()

export default async (req,res)=>{
    Video.find().sort({_id:-1}).then(videos=>{
        res.status(200).json(videos)
    })
}