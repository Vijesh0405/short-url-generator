
import { User } from "../models/user.models.js";
import { ApiError,ApiResponse,asyncHandler, checkEmailFormat } from "../utils/index.js";
import {uploadOnCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshToken  = async (user)=>{
    try {
        const accessToken = await user.generateAccessToken()
        const refreshToken  = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message||"Something went wrong while generating access token and refresh token")
    }
}

//get user by req.params.id
const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-password")


        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: user
                    },
                    "User found Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(404, "User not found ,please check id properly")
    }
})
const registerUser = asyncHandler(async (req,res)=>{
    const {username,fullName,email,password} = req.body

    if([username,fullName,email,password].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"all fields are required")
    }
    if(!checkEmailFormat(email)){
        throw new ApiError(400,"please enter email in correct format")
    }

    const existingUser = await User.findOne(
        {
            $or:[{username},{email}]
        }
    )
    if(existingUser){
        throw new ApiError(409,"user with this username or email already exists")
    }

    const avatarLocalPath = req.file?.path
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const user = await User.create({
        username,
        fullName,
        email,
        password,
        avatar:avatar?.url
    })
    if(!user){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User created successfully"
        )
    )

})

const loginUser = asyncHandler(async (req,res)=>{
    const {usernameOrEmail,password} = req.body

    if(!usernameOrEmail){
        throw new ApiError(400,"username or email is required")
    }

    const user  = await User.findOne(
        {
            $or:[{username:usernameOrEmail},{email:usernameOrEmail}]
        }
    )
    if(!user){
        throw new ApiError(404,"user not found,please register first")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400,"password is not correct")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    console.log(accessToken)
    //cookie options
    // in options ke karan hum cookies ko frontend se edit nahi kr sakte kevel server se edit kr sakte hai
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                },
                "User logged In Successfully"
            )
        )
})
//user logout
const logoutUser = asyncHandler(async (req, res) => {
    const userID = req.user._id

    //find user and remove refresh token ,tabhi to user logout hoga
    //remove cookies
    await User.findByIdAndUpdate(
        userID,
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true    //iska kam itna hai ki new updated user return ho ,old wala na ho
        }
    )

    //removing cookies and sending response

    //cookie options
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)    //cookie name same hona chahiye jo banate time nam diya tha wahi 
        .json(new ApiResponse(200, {}, "User logged out"))    //


})


//refresh AccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        //verify refresh token 
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        //find user
        const user = await User.findById(decodedToken?._id)

        //check user exists or not
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        //verify user.refreshToken and incomingRefreshToken
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "refresh token is expired")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)

        // cookie options
        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken
                    },
                    "Access Token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }

})

//change current password
const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body
    if (!newPassword || !oldPassword) {
        throw new ApiError(400, "all fields are required")
    }
    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "oldPassword is not correct")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "password is changed Successfully"
            )
        )
})

//get current User
const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "current user fetched Successfully"

            )
        )
})

//update account details
const updateAccountDetails = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body
    console.log(req.body)
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new ApiError(400,'email is already taken')
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName: fullName ? fullName : req.user?.fullName,
                email: email ? email : req.user?.email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "account details updated Successfully"
            )
        )
})

//update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {

    try {
        const avatarLocalPath = req.file?.path  //only avatar file hai to file use krenge naki files
    
        if (!avatarLocalPath) {
            throw new ApiError(400, 'Avatar file is required')
        }
    
        //upload on cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        if (!avatar) {
            throw new ApiError(500, "Something went wrong while uploading avatar file at updateUserAvatar")
        }
    
        //save new url to user and delete old one from cloudinary
    
        //delete oldAvatar from cloudinary
        const oldAvatar = req.user?.avatar
    
        const deleteResponse = await deleteFromCloudinary(oldAvatar)
    
        //save new user
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar: avatar.url
                }
            },
            {
                new: true
            }
        ).select("-password -refreshToken")
    
    
        //return response
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user,
                        deleteResponse
                    }
                    ,
                    "User avatar updated successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500,error?.message||"error at upldateavatar")
    }
})

export {registerUser,
    loginUser,logoutUser,
    changeCurrentPassword,
    updateUserAvatar,updateAccountDetails,
    getCurrentUser,refreshAccessToken,
    getUser

}