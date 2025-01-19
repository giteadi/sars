const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const fileUpload = require('express-fileupload');
const userRoutes = require("./Routes/userRoutes"); 
const adminRoutes = require("./Routes/adminRoute"); 
// const propertyRoutes = require("./Routes/propertyRoute");
// const testimonialRoutes=require("./Routes/testimonialRoute");
const cloudinaryConnect = require("./Config/cloudinary");
// const chekRoutes = require('./Routes/chekRoutes');
// const reserveRoutes = require('./Routes/reservationRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const cartRoutes=require("./Routes/cartRoutes");
const contactus=require("./Routes/contactus");
const blogRoute=require("./Routes/blogsRoute");

cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1',cartRoutes);
// app.use("/api/v1/property", propertyRoutes);
// app.use("/api/v1/testimonial",testimonialRoutes);
// app.use("/api/v1/check", chekRoutes);
// app.use("/api/v1/reservation", reserveRoutes);
app.use("/api/v1/payments",paymentRoutes);
app.use("/api/v1",contactus);
app.use('/api/v1',blogRoute);


const PORT = process.env.PORT || 3000;

// Create and configure server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Set a custom timeout (e.g., 2 minutes)
server.timeout = 120000; // 120 seconds
