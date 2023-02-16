import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const InfoForm = (props) => {

    //number временный ключ для map метода
    const addInfo = () => {
        props.setInfo([...props.info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        props.setInfo(props.info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        props.setInfo(props.info.map(i => i.number === number ? {...i, [key]: value} : i))

    }


    return (

        <Form>
            {!props.update
                ? <Button
                variant={"outline-dark"}
                onClick={addInfo}>
                Добавить характеристику
                </Button>
                :<></>
            }
            {props.info.map(i =>
                <Row className="mt-4" key={i.number}>
                    <Col md={4}>
                        <Form.Control
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder="Название"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            placeholder="Описание"
                        />
                    </Col>
                    <Col md={4}>
                        {!props.update
                        ?<Button
                            onClick={() => removeInfo(i.number)}
                            variant={"outline-danger"}
                            >
                            Удалить
                            </Button>
                        :<Button
                            onClick={() => {
                                props.removeInfoDB(props.info.at(0).id)
                                props.setInfoVisible(false)
                                props.clearInfo()
                            }}
                            variant={"outline-danger"}
                            >
                            Удалить
                         </Button>}
                    </Col>
                </Row>
            )}
        </Form>
    );
};

export default InfoForm;