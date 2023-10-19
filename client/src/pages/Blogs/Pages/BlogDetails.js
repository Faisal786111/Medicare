import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';
import Layout from "../../../components/Layout";
import { Divider } from "antd";
import { useSelector } from "react-redux";

const BlogDetails = () => {

    const [blog, setBlog] = useState({});
    const id = useParams().id;
    console.log(id);
    // const { user } = useSelector((state) => state.user);
    // const id = user ? user._id : null;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    // get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogDetail();
    }, [id]);

    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success("Blog Updated");
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(blog);
    return (
        <Layout>
            <div className='blogBackImage'>
                <form onSubmit={handleSubmit}>
                    <Box style={{ backgroundColor: 'rgba(211, 211, 211, 0.4)' }}
                        width={'50%'} /* Reduce the width */
                        border={2}
                        borderRadius={6}
                        padding={2}
                        margin="auto"
                        boxShadow='10px 10px 20px #ccc'
                        display="flex"
                        flexDirection={'column'}
                        marginTop={'0px'}
                        height={'auto'}>
                        <Typography textAlign={'center'} fontWeight="bold" variant='h4' padding={1} color={'grey'}>
                            Update Your Post
                        </Typography>
                        <Divider style={{ borderColor: 'black' }}></Divider>
                        <InputLabel sx={{ mb: 0, mt: 0, fontSize: '20px', fontWeight: "bold" }}>Title :--</InputLabel>
                        <TextField
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ fontSize: '14px' }}
                        />
                        <InputLabel sx={{ mb: 0, mt: 0, fontSize: "20px", fontWeight: "bold" }}> Description :--
                        </InputLabel>
                        <TextField
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ fontSize: '14px' }}
                        />
                        <InputLabel sx={{ mb: 0, mt: 0, fontSize: "20px", fontWeight: "bold" }} >
                            Image URL :--
                        </InputLabel>
                        <TextField
                            name="image"
                            value={inputs.image}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ fontSize: '14px' }}
                        />
                        <Button sx={{ borderRadius: 3 }} type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </form>
            </div>
        </Layout>
    );
};

export default BlogDetails;