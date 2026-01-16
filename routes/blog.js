const { Router } = require("express")
const router = Router();
const { addBlog, postBlog, upload, getBlog, postComment, deleteBlog } = require("../controller/blog");
const { requireAdmin } = require("../middleware/requireAdmin");

router.get("/add-new", addBlog)
router.get("/:id", getBlog)
router.post("/", upload.single('coverimg'), postBlog)
router.post("/comment/:blogId", postComment)
router.post("/:id/delete", requireAdmin, deleteBlog);

module.exports = router;