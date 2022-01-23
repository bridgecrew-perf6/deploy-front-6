import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import Footer from './../Footer/Footer';

export default function Profile() {
    return (
        <>
            <Sidebar />
            <div className='mainStyle ms-auto'>
                <Navbar />
                <div className="mainBackgroung shadow-lg">
                    <h3 className="my-5 mx-5">Profile</h3>
                </div>
                <Footer />
            </div>
        </>

    )
}
