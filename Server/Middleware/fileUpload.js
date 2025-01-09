const cloudinary = require("cloudinary").v2;

/**
 * Uploads a file to Cloudinary with retry logic.
 * @param {Object} file - The file object from the request.
 * @param {string} folder - The folder in Cloudinary where the file will be uploaded.
 * @param {number} maxRetries - The maximum number of retry attempts.
 * @returns {Promise<string>} - The secure URL of the uploaded file.
 */
async function uploadToCloudinaryWithRetry(file, folder, maxRetries = 3) {
    const options = { folder, resource_type: "auto" };

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Uploading file to Cloudinary...`);
            const result = await cloudinary.uploader.upload(file.tempFilePath, options);
            console.log("File uploaded successfully on attempt", attempt);
            return result.secure_url;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt === maxRetries) {
                console.error("Max retries reached. Upload failed.");
                throw error;
            }

            console.log("Retrying upload...");
        }
    }
}

/**
 * Middleware for handling image uploads and attaching URLs to the request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const imageUploader = async (req, res, next) => {
    try {
        console.log("Middleware: Received request with files:", req.files);

        const files = req.files?.imageFile;
        if (!files) {
            console.log("Middleware: No files uploaded.");
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const filesArray = Array.isArray(files) ? files : [files];
        console.log(`Middleware: Preparing to upload ${filesArray.length} file(s).`);

        const imageUrls = [];

        // Upload files sequentially with retry logic
        for (const [index, file] of filesArray.entries()) {
            console.log(`Middleware: Uploading file ${index + 1}, temp path: ${file.tempFilePath}`);
            try {
                const url = await uploadToCloudinaryWithRetry(file, "superhomess");
                console.log(`Middleware: File ${index + 1} uploaded successfully, URL: ${url}`);
                imageUrls.push(url);
            } catch (error) {
                console.error(`Middleware: Error uploading file ${index + 1} after retries:`, error);
                return res.status(500).json({
                    success: false,
                    message: `Error uploading file ${index + 1}`,
                    error: error.message,
                });
            }
        }

        console.log("Middleware: All files uploaded successfully:", imageUrls);

        // Attach the first uploaded image URL to req.body.imageUrl
        req.body.imageUrl = imageUrls[0];
        req.body.imageUrls = imageUrls; // Optionally pass all URLs if needed

        next();
    } catch (error) {
        console.error("Middleware: Error in imageUploader middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Error in image uploader middleware",
            error: error.message,
        });
    }
};

module.exports = { imageUploader };
