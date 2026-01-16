const { Router } = require("express")
const router = Router();
const { handleGetSignup, handleGetSignin, handlePostSignup, handlePostSignin, handleLogout } = require("../controller/user")


router.get("/signup", handleGetSignup);
router.get("/signin", handleGetSignin);
router.post("/signup", handlePostSignup);
router.post("/signin", handlePostSignin);
router.get("/logout", handleLogout);

module.exports = router;