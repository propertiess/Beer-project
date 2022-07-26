import React, {Suspense} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import {HashRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import {Container, Row} from "react-bootstrap";
import ReactLoading from "react-loading";
import HomePage from "./components/HomePage";

const Products = React.lazy(() => import('./components/Products'));
const BeerItemPage = React.lazy(() => import('./components/BeerItemPage'))

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<HomePage></HomePage>}></Route>

                <Route path={'/beers/page/:id'} element={
                    <Suspense fallback={
                        <Container>
                            <Row className={'justify-content-center'}>
                                <ReactLoading color={'blue'}></ReactLoading>
                            </Row>
                        </Container>

                    }><Products></Products></Suspense>}>
                </Route>
                <Route path={'/beers/:id'} element={
                    <Suspense fallback={
                        <Container>
                            <Row className={'justify-content-center'}>
                                <ReactLoading color={'blue'}></ReactLoading>
                            </Row>
                        </Container>

                    }><BeerItemPage></BeerItemPage></Suspense>
                }></Route>
            </Routes>
        </HashRouter>

    );
}

export default App;
