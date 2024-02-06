import Mongoose from '../../helpers/mongoose'
import Photo from '../../models/photo'

Mongoose()

export default async (req,res)=>{
    Photo.find().sort({_id:-1}).then(photos=>{
        res.status(200).json(photos)
    })
}