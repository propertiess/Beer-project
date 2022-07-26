import React from 'react';
import NavRouter from "./NavRouter";
import {Container} from "react-bootstrap";

const HomePage = () => {
    return (
        <div className={'min-vh-100'}>
            <NavRouter></NavRouter>
            <Container className={'my-5'}>
                <h1 className={'text-center mb-4'}>Это главная страница пива! :)</h1>
                <p className={'text-center'}>Для того, чтобы найти лучшее пиво по низким ценам, нужно перейти во
                    вкладочку товары.</p>

            </Container>
        </div>
    );
};

export default HomePage;