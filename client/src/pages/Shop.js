import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import SelectorBar from "../components/SelectorBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import Pages from "../components/Pages";
import SortBar from "../components/SortBar";

const Shop = observer(() => {
    const {device} = useContext(Context)

    //Подключаем наши get запросы на сервер
    useEffect(()=>{
        fetchTypes().then(data => device.setTypes(data)) // Загружаем типы с сервера
        fetchBrands().then(data => device.setBrands(data)) // Загружаем брэнды с сервера
        fetchDevices(null,null,1,2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setChangedDevices(data.rows)
            device.devices.map(dev=>{
                device.setCurrentBrands(Array.from(new Set([...device.currentBrands,dev.brandId])))}
            )
        })

    },[])

    useEffect(()=>{
        fetchDevices(device.selectedType,Array.from(new Set(device.selectedBrand)),device.page,10).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setChangedDevices(data.rows)
        })
    },[device.page,device.selectedType,device.selectedBrand])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <SelectorBar/>
                </Col >
                <Col md={9}>
                    <SortBar/>
                    <DeviceList/>
                    <Pages/>
                </Col >
            </Row>
        </Container>
    );
});

export default Shop;