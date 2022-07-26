import React, {FC, useEffect, useState} from 'react';
import {IBeer} from "../types/types";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import classes from '../styles/BeerItemPage.module.css'

type IBeerItemPageParams = {
    id: string;
}
const BeerItemPage: FC = () => {
    const [beer, setBeer] = useState<IBeer[] | null>(null);
    const params = useParams<IBeerItemPageParams>();
    const navigate = useNavigate();
    const getBeer = async () => {
        try {
            const res = await axios.get<IBeer[]>('https://api.punkapi.com/v2/beers/' + params.id);
            setBeer(res.data);
        }catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        getBeer();
    },[])

    return (
        <div>
            {beer?.map(item => (
                <Container key={params.id} className={'d-flex flex-column justify-content-center align-items-center'}>

                    <Row className={'justify-content-center my-4'}>
                        <Col>
                            <Container className={'mb-3 justify-content-center d-flex'}>
                                <img src={item.image_url} alt={item.name} className={`img-fluid ${classes.img}`}/>

                            </Container>

                            <h2 className={'text-red fs-1'}>{item.name}</h2>
                            <p>{item.tagline}</p>
                            <p>{item.description}</p>
                            <p>{item.abv}</p>
                            <p>{item.food_pairing}</p>
                        </Col>
                    </Row>
                    <Row className={'text-end my-3 w-100'}>
                        <Col>
                            <button className={'btn btn-primary'} onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </Container>

            ))}


        </div>
    );
};

export default BeerItemPage;