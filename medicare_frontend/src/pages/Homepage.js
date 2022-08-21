import React from 'react';
import Layout from "../components/Layout";
import "../layout.css";
import image2 from "../background/image2.jpg"



function Homepage() {


    return (
        <Layout>
         <img src={image2} style={{height:'100%', width:'100%'}}/>   
        </Layout >

    );
}

export default Homepage;