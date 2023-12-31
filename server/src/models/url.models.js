import {mongoose,Schema} from 'mongoose'

const urlSchema  = new Schema(
    {
        shortUrl:{
            type:String,
            required:true
        },
        redirectUrl:{
            type:String,
            required:true
        },
        visitHistory:[
            {timestamp:{
                type:Number
            }
        }
        ],
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

export const Url = mongoose.model("Url",urlSchema)