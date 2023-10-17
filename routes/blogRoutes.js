
const express = require('express');
const { getAllBlogController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    userBlogController } = require('../controllers/blogController');

//router object
const router = express.Router();

//routes
//get all blogs ||get
router.get('/all-blog', getAllBlogController);

//create blogs || post
router.post('/create-blog', createBlogController);

//update blog || put
router.put('/update-blog/:id', updateBlogController);

//get single blog || get
router.get('/get-blog/:id', getBlogByIdController);

//delete blog || delete
router.delete('/delete-blog/:id', deleteBlogController);

//get single blog || get
router.get('/user-blog/:id', userBlogController);


module.exports = router;