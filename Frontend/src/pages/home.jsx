import "../style/home.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const navigateToForm = () => {
        navigate('/form');
    };
    const navigateToList = () => {
        navigate('/list');
    };

    return (
        <div>
            <header className='flexHeader'>
                <div className="wordHead">
                    <h1 className="headItem-1">Huawei Tech Investment</h1>
                    <p className="headItem-2">Homepage</p>
                </div>
            </header>
            <body>
                <div className="flexBody">
                    <button className="navButton" onClick={navigateToForm}>Daftar</button>
                    <button className="navButton" onClick={navigateToList}>List Pengguna</button>
                </div>
            </body>
        </div>
    );
};

export default Home;
