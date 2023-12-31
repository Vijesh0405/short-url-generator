import { Url } from "../models/url.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from 'nanoid'
const generateUrl = asyncHandler(async (req, res) => {
    const { url } = req.body
    if (!url) {
        throw new ApiError(400, "url is required")
    }
    const existingUrl = await Url.findOneAndUpdate(
        { redirectUrl: url, createdBy: req.user._id },
        {
            $set: {
                shortUrl: nanoid(8),
                visitHistory: []
            }
        },
        {
            new: true
        }
    )
    // if existing url is not null then return it 
    if (existingUrl) {
        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    existingUrl,
                    "url generated successfully"
                )
            )
    }
    
    //else create new one 
    const shortUrl = nanoid(8)
    console.log(shortUrl)

    const generatedUrl = await Url.create(
        {
            shortUrl,
            redirectUrl: url,
            visitedHistory: [],
            createdBy: req.user._id
        }
    )
    if (!generatedUrl) {
        throw new ApiError(500, "Something went wrong while generating new url")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                generatedUrl
                ,
                "url generated successfully"
            )
        )

})

const handleRequestsOnShortUrl = asyncHandler(async (req, res) => {
    const { shortUrl } = req.params
    const url = await Url.findOneAndUpdate(
        {
            shortUrl
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )
    if (!url) {
        throw new ApiError(404, "url doesn't exist")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    redirectUrl: url.redirectUrl
                }

            )
        )

})

const getAnalytics = asyncHandler(async (req, res) => {
    const { shortUrl } = req.params
    const url = await Url.aggregate(
        [
            {
                $match: { shortUrl }
            },
            {
                $addFields: {
                    totalVisits: {
                        $size: "$visitHistory"
                    }
                }
            }
        ]
    )
    if (!url) {
        throw new ApiError(404, "url doesn't exist")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    url
                },
                "url details fetched successfully"

            )
        )

})
export { generateUrl, handleRequestsOnShortUrl, getAnalytics }