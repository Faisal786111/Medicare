import React, { useState } from 'react';
import Layout from '../components/Layout';
import MedicalDetail from '../components/MedicalDetail';
import medicalData from '../Data/MedicalData';
import Pagination from './Pagination';

const Medical = () => {
    const [select, setSelect] = useState(''); // Set initial state


    const filterData = medicalData.filter(data => data.location.toLowerCase() === select.toLowerCase());
    
    //pagination purpose 
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(3)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;

    const currentPosts = filterData.slice(firstPostIndex,lastPostIndex);

    return (
        <Layout>
            <div className='backimg_1' style={{ minHeight: "100%" ,border:"1px solid blue"}}>
                {/* <div style={{ display: "flex ", justifyContent: "flex-end",gap:"30px", height: "",marginTop:"30px" , alignItems: "center", border: "1px solid black", gap: "10px" }}> */}
                    {/* <h2 style={{  }}>{'<<<'}{select}{'>>>'}</h2> */}
                    <select value={select} onChange={(e) => setSelect(e.target.value)} style={{  width: '250px', height: '40px', marginLeft: "76%",marginTop:"20px", background: 'linear-gradient(to right,#dddddd, #ffffff)' }}>
                        <option value="">Select</option>
                        <option value="Virar">Virar</option>
                        <option value="Kharghar">Kharghar</option>
                    </select>
                {/* </div> */}
                <div className="container">
                    <div className="card-deck">
                        <div className="mt-5 d-flex justify-content-center">
                            <div className="row w-80">
                                {currentPosts.map(data => (
                                    <MedicalDetail key={data.id} data={data} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className=' d-flex justify-content-center'>
                        <Pagination totalPosts={select.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Medical;
