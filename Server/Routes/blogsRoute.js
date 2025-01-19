const express = require("express");
const {
    addBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require("../Controllers/blogs");
const { imageUploader } = require("../Middleware/fileUpload");
const router = express.Router();

router.post("/blogs",imageUploader, addBlog);           
router.get("/blogs", getAllBlogs);        
router.get("/blogs/:id", getBlogById);    
router.put("/blogs/:id", updateBlog);     
router.delete("/blogs/:id", deleteBlog);  

module.exports = router;
