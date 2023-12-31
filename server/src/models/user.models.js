import {mongoose,Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema(
    {
        username:{
            type:String,
            lowercase:true,
            unique:true,
            required:[true,"username is required"],
            trim:true
        },
        email:{
            type:String, 
            unique:true,
            required:[true,"email is required"],
            trim:true
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        fullName:{
            type:String,
            rrequired:[true,"fullName is required"],
            trim:true
        },
        urls:[
            {
                type:Schema.Types.ObjectId,
                ref:"Url"
            }
        ],
        refreshToken:{
            type:String,
            
        },
        avatar:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

//password hashing 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)

    return next()
})

//password checking 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

//generate access token and refresh token 
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User",userSchema)