import React from "react";

const InitialPage = () => {

    const containerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const pageStyling = {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f5f5f5',
        height: 'auto', 
        width: '100vw',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Roboto, sans-serif',
        backgroundImage: 'linear-gradient(to bottom, black, #f5f5f5)',
    };

    const styleButton = {
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '15px 30px',
        cursor: 'pointer',
        margin: '0 auto',
        borderRadius: '6px',
        transition: 'background-color 0.5s',
        fontSize: '1.2rem',
        display: 'block',
        width: '200px',
        height: '80px',
        marginBottom: '1rem',
    };

    const styleH1 ={
        marginBottom: '2rem',
        fontSize: '3rem',
        textAlign: 'center' 
    }

    const styleDiv = {
        marginBottom: '4%',
        fontSize: '1.2rem',
    }

    const styleP = {
        maxWidth: '80%',
        margin: '0 auto',
        marginBottom: '1.5rem',
        fontSize: '1rem',
    }   

    const styleUl = {
        marginBottom: '5%',
        fontWeight: 'bold',
    }

    const styleH6 = {
        fontSize: '0.9rem',
    }

    const styleLi = {
        margin: '2%',
        listStyle: 'none',
    }


    const resumeDownload = () => {
        const resumePath = 'https://onedrive.live.com/embed?resid=F6DA5EC76559F59E%21361280&authkey=!AASqLTIRgIzhw0M&em=2';
        window.open(resumePath, '_blank');
    };


    const takeToRoom = () => {
        window.location.href = '/room';
    };


    return (
        //My Portfolio page Content
        <div style={pageStyling} className="page-container">
            <div style={containerStyle}>
                <h1 style={styleH1}>Welcome to my Portfolio</h1>
                <div style={styleDiv}>
                    <p style={styleP}>This is a 3D portfolio that display some objects inside of a room. Each specific object redirects to a specific part of my portfolio. Here are the objects and the part of my portfolio.</p>
                    <ul style={styleUl}>
                        <li style={styleLi}>Light Bulb on roof = My Summary</li>
                        <img src="./images/neon_light.png" alt="Neon Light Demonstration" style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }} />
                        <li style={styleLi}>Paintings = Apps</li>
                        <img src="./images/painting_click.png" alt="Neon Light Demonstration" style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }} />
                        <h6 style={styleH6}>Note: Click on each object to render the specific part of my portfolio.</h6>
                        <h6 style={styleH6}>Note: Hit the arrow keys for camera movement.</h6>
                    </ul>
                    <p>Have Fun!!!</p>
                </div>
                <button onClick={takeToRoom} style={styleButton}>
                    Let's Go
                </button>
                <div id="resume">
                    <button onClick={resumeDownload} style={styleButton}>View my Resume</button>
                </div> 
            </div> 
        </div>
    );
};

export default InitialPage;