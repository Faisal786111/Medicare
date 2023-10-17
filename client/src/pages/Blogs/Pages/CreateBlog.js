import React, { useState } from 'react';
import { Box, InputLabel, Typography, Button, TextField } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import Layout from '../../../components/Layout';

const CreateBlog = () => {

    //const id = localStorage.getItem("userId");
    const { user } = useSelector((state) => state.user);
    const id = user ? user._id : null;

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    });

    //input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            });

            if (data?.success) {
                toast.success("Blog Created!");
                //aur jab blog create hojayega usse apn my blogs pe redirect kar dege
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Layout>
                <form onSubmit={handleSubmit}>
                    <Box width={'50%'} border={3} borderRadius={10} padding={3} margin="auto" boxShadow='10px 10px 20px #ccc' display="flex" flexDirection={'column'} marginTop={'30px'} height={'auto'}>
                        <Typography textAlign={'center'} fontWeight="bold" variant='h4' padding={3} color={'grey'}>
                            {/* Create blogs and share your insights and stories with others! */}
                        </Typography>
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: "bold" }}>Title</InputLabel>
                        <TextField
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required />
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}> Description
                        </InputLabel>
                        <TextField
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }} >
                            Image URL
                        </InputLabel>
                        <TextField
                            name="image"
                            value={inputs.image}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <Button sx={{ borderRadius: 3 }} type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Layout>
        </>
    )
}

export default CreateBlog;
