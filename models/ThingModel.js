import mongoose from 'mongoose';


const ThingSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    type:{
        type:[String],
        required:true
    }
})

export const ThingModel = mongoose.model("ThingDatabase",ThingSchema)