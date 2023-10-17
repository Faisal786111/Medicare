import React, { useEffect, useState } from "react";
import { Form, Input, message, Divider, Button } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Translation from "../Translation/Data.json";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/FooterYou";

const Login = () => {

  //translation
  const [language, setLanguage] = useState("english")
  const [content, setContent] = useState({})
  useEffect(() => {
    if (language == "english") {
      setContent(Translation.english)
    } else if (language == "hindi") {
      setContent(Translation.hindi)
    }
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/commonPage");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div className="background_image" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Form onFinish={onfinishHandler} className="register-form" >
          {/* <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                <option>english</option>
                <option>hindi</option>
              </select> */}
          <h3 className="text-center effect">{content.loginHeading}</h3>
          <hr />
          <Form.Item label={content.email} name="email" rules={[{ required: true, type: "email", message: "Please enter email" }]}>
            <Input type="email" placeholder={content.placeemail} required />
          </Form.Item>
          <Form.Item label={content.password} name="password" rules={[{ required: true, type: "password", message: "Please enter password" }]}>
            <Input.Password type="password" placeholder={content.placepassword} required />
          </Form.Item>
          <Form.Item style={{ marginLeft: 150 }}>
            <Button type='primary' htmlType='submit' shape='round' size='large'>{content.submitButton}</Button>
          </Form.Item>
          <Divider style={{ borderColor: 'black' }}>{content.loginline}</Divider>
          <Form.Item style={{ marginLeft: 130 }}>
            <NavLink to="/register" className="text-dark magic" style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>{content.loginlink}</NavLink>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Login;

