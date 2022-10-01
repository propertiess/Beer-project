import React, {useEffect, useState} from 'react';
import {IBeer} from "../types/types";
import {BeerItem} from "./BeerItem";
import {Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ReactLoading from "react-loading";
import {CSSTransition} from "react-transition-group";
import '../styles/BeerList.css'
interface IBeerListProps {
    beers: IBeer[];
    isBeersLoading: boolean;
    search: string;
}

const BeerList = ({beers, isBeersLoading, search}: IBeerListProps) => {
    const [nothing, setNothing] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (search !== '') {
            if (beers.length > 0) {
                setNothing(false);
            } else if (beers.length === 0) {
                setNothing(true);
            }
        } else if (search === '') {
            if(beers.length) {
                setNothing(false);
            }
        }

    }, [search])
    return (
        <Row className={'flex-wrap gap-5 justify-content-center mb-5 position-relative'}>
            <CSSTransition in={nothing} timeout={300} classNames={'nothing'} mountOnEnter unmountOnExit>
                <Container className={'position-absolute nothing-item'}>
                    <Row>
                    <h2>Ничего не найдено</h2>
                </Row></Container>

            </CSSTransition>
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