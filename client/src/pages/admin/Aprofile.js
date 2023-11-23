import React from 'react'
import Layout from '../../components/Layout';
import adminHeaderImage from "../../../src/images/adminHomeImage.jpg";

const Aprofile = () => {
    return (
        <Layout>
            <div className='backimg_1' style={{ minHeight: "100%" }}>
                <h2 className='text-center'>{"<<<<"}{"Admin Profile Page..."}{">>>>"}</h2>


                <div className='mt - 15'>
                    <div >
                        <div className="row" style={{justifyContent : 'center',alignItems: 'center', display: 'flex'}}>
                            <div className="col-md-6 col-sm-6 col-12 offset-md-1 md-mx-5 mt-2">
                                <h4>As the admin, orchestrating seamless operations with strategic precision, ensuring excellence is not just a goal but a standard.</h4>
                                <p className="text-secondary">The administrator is a key figure in orchestrating operations with strategic precision, ensuring that excellence is not just a goal but a consistently maintained standard. Responsible for overseeing various aspects of an organization,
                                    they work towards smooth functioning and success with a proactive, leadership-oriented approach.</p>
                            </div>
                            <div className="col-md-5">
                                <img src={adminHeaderImage} className="img-fluid rounded" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Aprofile;
