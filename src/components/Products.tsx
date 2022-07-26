import React, {useEffect, useMemo, useState} from 'react';
import {Col, Container, Form, Navbar, Row} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import {IBeer} from "../types/types";
import axios from "axios";
import {getPagesArray} from "../utils/page";
import ReactLoading from 'react-loading';
import {useNavigate, useParams} from "react-router-dom";
import NavRouter from "./NavRouter";
import BeerList from "./BeerList";


type Products = {
    id: string;
}
const HomePage = () => {

    const [beers, setBeers] = useState<IBeer[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const limit = 9;
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState('')
    const params = useParams<Products>();
    const navigate = useNavigate();
    let pagesArray = getPagesArray(totalPages);
    const [isBeersLoading, setIsBeersLoading] = useState(false);

    const changePage = (p: number) => {
        navigate('/beers/page/' + p)
        setPage(p);
        setSearch('');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const getBeers = async () => {
        try {
            await setIsBeersLoading(true);
            if(Number(params.id) > 9) {
                navigate('/beers/page/9');
                changePage(9);
                const res = await axios.get<IBeer[]>(`https://api.punkapi.com/v2/beers?page=9&per_page=${limit}`);
                setBeers(res.data);
                await setIsBeersLoading(false);
                return;
            }
            const res = await axios.get<IBeer[]>(`https://api.punkapi.com/v2/beers?page=${params.id}&per_page=${limit}`);
            setBeers(res.data);
            setPage(Number(params.id));
            setTotalPages(9);
            await setIsBeersLoading(false);
        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        getBeers();
    }, [page])

    const filteredBeers = useMemo(() => {
        return beers.filter(beer => beer.name.toLowerCase().includes(search.toLowerCase()));
    }, [search,beers]);


    return (
        <div className={'wrapper d-flex  flex-column flex-grow min-vh-100'}>
            <NavRouter></NavRouter>
            <Container>
                <div>
                    <Navbar>
                        <Container>
                            <Row className={"w-100 mx-auto justify-content-center py-2 mb-3"}>
                                <Col sm={12} md={7} lg={7}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Поиск"
                                            value={search}
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar>
                </div>

                <main>
                    <Container>
                        {isBeersLoading
                        ? (<Container>
                                <Row className={'justify-content-center text-center'}>
                                    <ReactLoading color={'blue'}></ReactLoading>
                                    <h2>Загрузка</h2>
                                </Row>
                            </Container>)
                        : <BeerList isBeersLoading={isBeersLoading} search={search} beers={filteredBeers}></BeerList>
                        }
                    </Container>
                </main>



            </Container>
            <footer className={'mt-auto'}>
                <Container>
                    <Row className={'pb-3'}>
                        <Col className={'d-flex gap-1 justify-content-center'}>
                            {pagesArray.map(p => <Pagination onClick={() => changePage(p)} key={p}><Pagination.Item
                                active={p === page}>{p}</Pagination.Item></Pagination>)}

                        </Col>
                    </Row>

                </Container>
            </footer>

        </div>



    );
};

export default HomePage;