const { db } = require("../Config/db");

// Create a blog with image
const addBlog = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
       
        console.log("blog req.body->",req.body);
        // Validate required fields
        if (!title || !description || !imageUrl) {
            return res.status(400).json({ error: "Title, description, and image are required" });
        }

        // Insert the blog into the database
        const query = `
            INSERT INTO blogs (title, description, image_url)
            VALUES (?, ?, ?)
        `;
        const values = [title, description, imageUrl];

        const blogId = await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blogId,
        });
    } catch (error) {
        console.error("Error in addBlog:", error.message);
        res.status(500).json({ success: false, message: "Error in creating blog", error: error.message });
    }
};


// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogsQuery = "SELECT * FROM blogs ORDER BY created_at DESC";
        const blogs = await new Promise((resolve, reject) => {
            db.query(blogsQuery, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error("Error in fetching blogs:", error.message);
        res.status(500).json({ success: false, message: "Error in fetching blogs", error: error.message });
    }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blogQuery = "SELECT * FROM blogs WHERE id = ?";
        const blog = await new Promise((resolve, reject) => {
            db.query(blogQuery, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error("Error in fetching blog:", error.message);
        res.status(500).json({ success: false, message: "Error in fetching blog", error: error.message });
    }
};

// Update a blog
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        if (!title || !description || !imageUrl) {
            return res.status(400).json({ error: "All fields (title, description, imageUrl) are required" });
        }

        const updateQuery = `
            UPDATE blogs
            SET title = ?, description = ?, image_url = ?
            WHERE id = ?
        `;
        const updateValues = [title, description, imageUrl, id];

        const result = await new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows);
            });
        });

        if (result === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        console.error("Error in updating blog:", error.message);
        res.status(500).json({ success: false, message: "Error in updating blog", error: error.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteQuery = "DELETE FROM blogs WHERE id = ?";
        const result = await new Promise((resolve, reject) => {
            db.query(deleteQuery, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows);
            });
        });

        if (result === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error in deleting blog:", error.message);
        res.status(500).json({ success: false, message: "Error in deleting blog", error: error.message });
    }
};

module.exports = {
    addBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
