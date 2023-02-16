import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, Dropdown, Col, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createTypes} from "../../http/deviceApi";
const CreateType = ({show, onHide}) => {


    const {device} = useContext(Context)
    const [list,setList] = useState("Выберите тип")
    const [info,setInfo] = useState([])
    const [value, setValue] = useState("")

    let parsedArray = JSON.parse(JSON.stringify(device.types)) // parse data for getting keys.name
    let keysNames = Object.keys(parsedArray[0])

    const addType = ()=>{
        createTypes( {name: value}).then(() => {
            setValue("")
            onHide()
        })
    }

    const addInfo = ()=>{
        setInfo([...info,{title:"",description:"",number:Date.now()}])
    }
    const removeInfo = (number)=>{
        setInfo(info.filter(i=> i.number !== number))
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить
                </Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form className="mt-3">
                    <Dropdown>
                        <Dropdown.Toggle>{list}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {keysNames.map(names=>
                                    <Dropdown.Item key={names} onClick={()=>setList(names)}>{names}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название типа123"
                    />
                    <Form.Control
                        //value={price}
                        //onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        //onChange={selectFile}
                    />
                </Form>
                <hr/>
                <Button
                    variant={"outline-dark"}
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>
                {info.map(i=>
                <Row className="mt-3" key={i.number}>
                    <Col md={4} key={i.number}>
                        <Form.Control placeholder="Введите название свойства"/>
                    </Col>
                    <Col md={4} key={i.number}>
                        <Form.Control placeholder="Введите описание свойства"/>
                    </Col>
                    <Col md={4} onClick={()=> removeInfo(i.number)}>
                        <Button variant="outline-dark">Удалить</Button>
                    </Col>
                </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;