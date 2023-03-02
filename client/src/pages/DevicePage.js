import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from "../asstes/star.png"
import {useParams} from "react-router-dom";
import {deleteOneInfoDevice, fetchOneDevice} from "../http/deviceApi";
import {Context} from "../index";
import CreatePageInfo from "../components/modals/CreatePageInfo";


const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const [loading, setLoading] = useState(true)
    const [visibleInfo, setInfoVisible] = useState(false)
    const [info, setInfo] = useState([])
    const [update, setUpdate] = useState(false)
    const {user} = useContext(Context)
    const {id} = useParams() //получаем id для oneDevice

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
            setLoading(false)

        })

    }, [device])

    const clearInfo = () => {
        setInfo(info.filter(i => i.number === 0))
    }

    // Возвращаем отфильтровонный device.info из которого удален ненужный элемент и разворачиваем в старый массив
    const removeInfoDB = (id) => {
        deleteOneInfoDevice(id).then(() => {
            const result = device.info
                .map(item => ({...item, info: item.info}))
                .filter(i => i.id !== id)
            setDevice({...device, info: result})

        })
    }
    // Добавление элемента в массив user.basket
    const addToBasket = () => {
        fetchOneDevice(id).then(data => {
                if (user.basket.find(d => d.deviceId === data.id)) {
                    user.setBasket(user.basket.map(el => el.deviceId === data.id ? {
                        ...el,
                        numberOfDevices: el.numberOfDevices + 1
                    } : el))
                    console.log(data)
                } else {
                    user.setBasket([...user.basket, {
                        name: data.name,
                        price: data.price,
                        deviceId: data.id,
                        numberOfDevices: 1,
                        img: data.img,
                        brandId:data.brandId
                    }])
                }
            }
        )
    }

    if (!loading) {
        return (
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Image style={{height: 350, width: 350}} src={process.env.REACT_APP_API_URL + device.img}/>
                        <h2 className="d-flex justify-content-center align-items-center "
                            style={{fontSize: 48}}>{device.name}</h2>
                    </Col>
                    <Col md={4}>
                        <Row className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     background: `url(${star}) no-repeat center center`,
                                     width: 240, height: 240, backgroundSize: "cover",
                                     fontSize: 64
                                 }}
                            >
                                {device.rating}
                            </div>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Card
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                        >
                            <h3>От: {device.price} руб.</h3>
                            <Button variant={"outline-dark"} onClick={() => addToBasket()}>Добавить в корзину</Button>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex flex-column m-3">
                    <Row>
                        <h1>Характеристики</h1>
                        <Button
                            variant={"outline-dark"}
                            className="m-3"
                            onClick={() => {
                                setInfoVisible(true)
                                setUpdate(false)
                                clearInfo()
                            }}
                        >
                            Добавить новое свойство
                        </Button>
                        <CreatePageInfo show={visibleInfo} onHide={() => {
                            setInfoVisible(false)
                            clearInfo()
                        }}
                                        device={device} setDevice={setDevice} setLoading={setLoading}
                                        id={id} info={info} setInfo={setInfo} update={update}
                                        setUpdate={setUpdate} clearInfo={clearInfo} removeInfoDB={removeInfoDB}
                                        setInfoVisible={setInfoVisible}
                        />
                    </Row>

                    {device.info.map((infoData, index) =>
                        <Row key={infoData.id}
                             style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                            {user.isAuth
                                ? <Row>
                                    <Button variant="outline-success" onClick={() => {
                                        setInfoVisible(true)
                                        setUpdate(true)
                                        clearInfo()
                                        setInfo([...info, {
                                            id: infoData.id, title: infoData.title,
                                            description: infoData.description, number: Date.now()
                                        }])
                                    }} className="me-3 m-2">
                                        Обновить</Button>
                                    <Button variant="outline-danger" onClick={() => removeInfoDB(infoData.id)}
                                            className="me-3 m-2"> Удалить</Button>
                                    <div className="d-flex align-items-center justify-content-center">
                                        {infoData.title}: {infoData.description}
                                    </div>
                                </Row>

                                : <div className="d-flex align-items-center justify-content-center">
                                    {infoData.title}: {infoData.description}
                                </div>
                            }
                        </Row>
                    )}

                </Row>
            </Container>

        );
    }
}

export default DevicePage;