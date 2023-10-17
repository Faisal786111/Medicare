import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../../../components/BlogCard';
import { useSelector } from "react-redux";
import Layout from '../../../components/Layout';

const UserBlogs = () => {
    const [blogs, setBlog] = useState([]);
    //get user blogs
    const { user } = useSelector((state) => state.user);

    const getUserBlogs = async () => {
        try {
            // const id = localStorage.getItem('userId')
            const id = user._id;

            const { data } = await axios.get(`api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlog(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, []);
    console.log(blogs);
    return (
        <div>
            <Layout>

                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard
                            id={blog._id}// blog ke id se delete karege 
                            // aur user ke id se edit karege  
                            isUser={true}
                            title={blog.title}
                            description={blog.description}
                            image={blog.image}
                            username={blog.user.username}
                            time={blog.createdAt}
                        />
                    ))
                ) : (
                    <h1>You Haven't Created a blog</h1>
                )}
            </Layout>
        </div>
    )
}

export default UserBlogs
