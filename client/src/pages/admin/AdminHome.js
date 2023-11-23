import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import Translation from "../././../Translation/Data.json";
const AdminHome = () => {

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

    return (
        <Layout>
            <div className='backimg_1' style={{ minHeight: "100%" }}>
                <h2 className='text-center'>{"<<<<"}{content.adminhome}{">>>>"}</h2>

            </div>
        </Layout>
    )
}

export default AdminHome;
