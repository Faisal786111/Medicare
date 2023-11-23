import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout";
import { Col, Divider, Form, Input, Row, TimePicker, message, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import Translation from "../Translation/Data.json";

const ApplyDoctor = () => {

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

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form
  const handleFinish = async (values) => {
    console.log(values.timings)
    try {
      dispatch(showLoading());
      const formattedTimings = values.timings.map(time => time.format("HH:mm"));
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: {
            startTime: formattedTimings[0],
            endTime: formattedTimings[1],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      {/* <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                <option>english</option>
                <option>hindi</option>
      </select> */}
      <div className='backimg_1' style={{ justifyContent: 'center',alignItems: 'center', display: 'flex', minHeight: "100%" }}>
        <Form onFinish={handleFinish} className="register-form2"  >
          <h3 className="text-center">{'<<<'}{content.applydr}{'>>>'}</h3>
          <hr />
          <Divider style={{ borderColor: 'black' }}>{content.personal}</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={content.firstname} name="firstName" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placefirstname} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={content.lastname} name="lastName" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placelastname} required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={content.phoneno} name="phone" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placephone} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={content.email} name="email" required rules={[{ required: true }]}>
                <Input type="email" placeholder={content.placeemail} required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={content.web} name="website" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placeweb} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={content.add} name="address" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placeadd} required />
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ borderColor: 'black' }}>{content.professional}</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={content.specification} name="specialization" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placespeci} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={content.experi} name="experience" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placeexper} required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={content.fee} name="feesPerConsultation" required rules={[{ required: true }]}>
                <Input type="text" placeholder={content.placefee} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={content.time} name="timing" required rules={[{ required: true }]}>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginLeft: 185 }}>
            <Button type='primary' htmlType='submit' shape='round' size='large' style={{ width: "300px" }}>{content.submitButton}</Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
