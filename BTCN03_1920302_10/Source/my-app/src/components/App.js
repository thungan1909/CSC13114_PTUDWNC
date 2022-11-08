import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';

function App() {
    const [_imgList, _setImgList] = useState([]);
    useEffect (() => {
    loadMemes();
},[]);

function loadMemes () {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(
        (result) => {
            const images = result.data.memes.map(meme => meme.url);
            let randomIdx = Math.floor(Math.random() * images.length/10);
            _setImgList(images.slice(randomIdx, randomIdx + 15));
        },
        (error) => { }
    )
}
return (
    <Container className='p-4'>  
        <Col className ="justify-content-center mb-3">
            <Button variant="success" onClick={loadMemes}> Get Memes</Button> {''}
        </Col>
        <Row>
            {_imgList.map((item,index) => {
                return <Col key = {index} >
                    <img alt="" src={item} ></img>
                </Col>
             })}
        </Row>
    </Container>
);
}
export default App;