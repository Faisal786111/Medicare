const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModels');

//get all blogs
const getAllBlogController = async (req, res) => {
    try {
        // const blogs = await blogModel.find({}).populate("user");
        const blogs = await blogModel.find({});
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'no blogs found'
            });
        }
        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: 'all blog lists',
            blogs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error while getting blogs',
            error
        });

    }
};

//create blogs
const createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide ALl Fields",
            });
        }
        const existingUser = await userModel.findById(user);
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user'
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        /**Imagine a situation where the new blog is successfully created, but there's an error when trying to 
         * associate it with the user. Without a session and transaction, the database could end up in an inconsistent 
           state where a blog exists but is not properly linked to a user.
         * On the other hand, if an error occurs during the creation of the blog, you want to make sure that nothing 
           gets saved. 
         * You don't want partial changes lingering in the database.
           So, the session and transaction approach ensures that the entire set of operations 
          (creating a blog and associating it with a user) is treated as a single, atomic unit. 
         * If any part of it fails, the whole transaction is rolled back, and the database remains consistent. */
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error while creating blogs',
            error
        });

    }
};

//update blog
const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Updating the blog",
            error,
        });
    }

};

//single blog
const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const blog = await blogModel.findById(id);
        console.log(blog);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this is",
            });
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting single blog",
            error,
        });
    }
};

// delete blog
const deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            // .findOneAndDelete(req.params.id)
            .findByIdAndDelete(req.params.id)
            .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Erorr WHile Deleteing BLog",
            error
        });
    }
};

// get user blog
const userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error
        });
    }
};

module.exports = {
    getAllBlogController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    userBlogController,
}