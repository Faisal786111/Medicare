import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../../../components/BlogCard';
import { useSelector } from "react-redux";
import Layout from '../../../components/Layout';
import Pagination from '../../Pagination';

const UserBlogs = () => {

    const [blogs, setBlog] = useState([]);

    //pagination purpose 
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(3)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;

    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

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
        <Layout>
            <div className='blogBackImage'>
                <div className="d-flex justify-content-center " style={{ marginTop: "0px", alignItems: "center" }} >
                    {currentPosts && currentPosts.length > 0 ? (
                        currentPosts.map((blog) => (
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
                </div>
                <div className="d-flex justify-content-center " style={{ marginTop: "50px", alignItems: "center" }} >
                    <Pagination totalPosts={blogs.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </Layout>
    )
}

export default UserBlogs
