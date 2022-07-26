import React from 'react';
import {IBeer} from "../types/types";
import {BeerItem} from "./BeerItem";
import {Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ReactLoading from "react-loading";

interface IBeerListProps {
    beers: IBeer[];
    isBeersLoading: boolean;
}

const BeerList = ({beers, isBeersLoading}: IBeerListProps) => {
    const navigate = useNavigate();
    if(!beers.length) {
        return (<div><h1>Ничего не найдено</h1></div>)
    }
    return (
        <Row className={'flex-wrap gap-5 justify-content-center mb-5'}>
            {isBeersLoading
                ? <Container>
                    <Row className={'justify-content-center text-center'}>
                        <ReactLoading color={'blue'}></ReactLoading>
                    </Row>
                </Container>
                : beers.map(beer => (
                <BeerItem key={beer.id} beer={beer} onClick={() => navigate('/beers/' + beer.id)}></BeerItem>))
            }

        </Row>
    );
};

export default BeerList;