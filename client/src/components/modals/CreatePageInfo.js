import React from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {createDeviceInfo, fetchOneDevice, updateDeviceInfo} from "../../http/deviceApi";
import InfoForm from "./InfoForm";

const CreatePageInfo = observer(({show, onHide,device,setDevice,
                                     setLoading,id,info,setInfo,update,setUpdate,
                                     clearInfo,removeInfoDB,setInfoVisible}
    ) => {
    const addDeviceInfo = (e) => {
        e.preventDefault()
        const formData = new URLSearchParams()
        formData.append('deviceId', device.id)
        formData.append('info', JSON.stringify(info))
        createDeviceInfo(formData).then(() => onHide())
        fetchOneDevice(id).then(data => {
            setDevice(data)
            setLoading(false)
        })
        clearInfo()
    }

    const updateInfo = (e) => {
        e.preventDefault()
        const formData = new URLSearchParams()
        formData.append('info', JSON.stringify(info))
        formData.append('deviceId', id)
        formData.append('infoId', info.at(0).id)
        updateDeviceInfo(id,formData).then(newDeviceInfo => {
            setDevice({...device,info:[newDeviceInfo]})
            setLoading(false)
            clearInfo() // чистка поля для добавления данных
            setUpdate(false)
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
                <button type="button" className="close" aria-label="Close" onClick={onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <InfoForm info={info} setInfo={setInfo} update={update} removeInfoDB={removeInfoDB}
                          setInfoVisible={setInfoVisible} clearInfo={clearInfo}></InfoForm>
            </Modal.Body>
            <Modal.Footer>
                {update
                    ?<>
                     <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                     <Button variant="outline-success" onClick={updateInfo}>Обновить</Button>
                     </>
                    :<><Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                     <Button variant="outline-success" onClick={addDeviceInfo}>Сохранить</Button>
                     </>
                }
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePageInfo;