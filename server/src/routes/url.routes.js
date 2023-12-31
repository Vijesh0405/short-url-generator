import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { generateUrl, getAnalytics, handleRequestsOnShortUrl } from "../controllers/url.controllers.js";
const router = Router()


router.route('/')
    .get((req, res) => {
        res.json("Hello from url server")
    })

router.route('/generate-url')
.post(verifyJwt,generateUrl)

router.route('/short-url/:shortUrl')
.get(handleRequestsOnShortUrl)

router.route('/analytics/:shortUrl')
.get(verifyJwt,getAnalytics)
export default router