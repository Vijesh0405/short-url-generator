import { Router } from "express";
import { changeCurrentPassword, deleteUser, getCurrentUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js"
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router()


router.route('/')
    .get((req, res) => {
        res.json("Hello from server")
    })


router.route('/get-current-user')
    .get(verifyJwt, getCurrentUser)

router.route('/userid/:id')
    .get(getUser)

router.route('/register')
    .post(
        upload.single("avatar"),
        registerUser
    )

router.route('/login')
    .post(loginUser)

// secured routes
router.route('/logout')
    .post(verifyJwt, logoutUser)

router.route('/refresh-token')
    .post(refreshAccessToken)


//Account Update Routes

//change current password
router.route('/change-password')
    .patch(verifyJwt, changeCurrentPassword)

//change fullName or email route
router.route('/change-account-details')
    .patch(verifyJwt, updateAccountDetails)

//change avatar
router.route('/change-avatar')
    .patch(
        verifyJwt,
        upload.single("avatar"),
        updateUserAvatar
    )
router.route('/account/delete')
.delete(
    verifyJwt,
    deleteUser
)


export default router