import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import DeviceList from "./DeviceShop/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index.js";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import Pages from "../components/Pages";
import SortBar from "../components/SortBar";
import SelectorBar from "../components/SelectorBar/SelectorBar";

const Shop = observer(() => {
    const {device, optionDevice} = useContext(Context)
    let limitPages = 8

    //Подключаем наши get запросы на сервер
    // page текущая страница limit относиться к deviceController в котором указываем сколько элементов запрашивать
    useEffect(() => {
        fetchDevices(null, null, 1, limitPages).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setLimit(limitPages)
            device.setChangedDevices(data.rows)
            data.rows.map(dev => optionDevice.setTypeBrandListId([...optionDevice.typeBrandListId, {
                typeId: dev.typeId,
                brandId: dev.brandId
            }]))

        })
        fetchTypes().then(data => device.setTypes(data)) // Загружаем типы с сервера
        fetchBrands().then(data => device.setBrands(data)) // Загружаем брэнды с сервера
        device.setSelectedBrand([])// Чистка выборки Brand при загрузке
        device.setSelectedType([])// Чистка выборки Type при загрузке
    }, [])

    //Мониторинг изменений брендов или типов(постоянное автоматические запросы)
    /*useEffect(() => {
        fetchDevices(Array.from(new Set(device.selectedType)),
            Array.from(new Set(device.selectedBrand)), device.page,
            8, JSON.stringify(optionDevice.limitPrice)).then(data => {

            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setChangedDevices(data.rows)
        })
    }, [device.page, device.selectedType,device.selectedBrand])*/

    return (

        <Container>
            <Row>
                <Col md={3}>
                    <SelectorBar/>
                </Col>
                <Col md={9}>
                    <SortBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;