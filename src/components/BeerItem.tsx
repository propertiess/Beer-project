import React from 'react'
import {IBeer} from '../types/types';
import {Button, Card, Col, Container} from "react-bootstrap";
import '../styles/BeerItem.css'
import {motion} from "framer-motion";
import {variants} from "../Animation presets/animation";

interface IBeerItemProps {
    beer: IBeer;
    onClick: (beer: IBeer) => void;

}
export const BeerItem = ({beer, onClick}: IBeerItemProps) => {
    function CutDesc(text: string, limit: number) {
        text = text.trim();
        if (text.length <= limit) return text;
        text = text.slice(0, limit);
        let lastSpace = text.lastIndexOf("...");
        if (lastSpace > 0) {
            text = text.substr(0, lastSpace);
        }
        return text + "...";
    }



    return (
        <Col sm={12} md={6} xl={3}  className={'overflow-hidden d-flex align-items-stretch'} as={motion.div}
        initial={'hidden'}
         whileInView={'visible'}
         variants={variants}
         viewport={{once: true,}}
        >

            <Card>
                <Card.Body className={'item overflow-hidden'}>
                    <Container className={'d-flex justify-content-center mb-3'}>
                        <img alt={beer.name} className={'img-fluid item__img'} src={beer.image_url}/>

                    </Container>
                    <Card.Title>{beer.name}</Card.Title>
                    <Card.Text>
                        {CutDesc(beer.description, 140)}
                    </Card.Text>

                </Card.Body>
                <footer className={'pb-2 mt-auto ms-3 btn_center'}>
                    <Button onClick={() => onClick(beer)} variant="primary">Узнать подробнее</Button>
                </footer>
            </Card>


        </Col>
    )
}
