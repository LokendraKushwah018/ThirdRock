import React from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'reactstrap'

const Model = ({ show, handleClose, deleteEmployees, id }) => {

    console.log('show',show,'handleClose',handleClose,'deleteEmployees',deleteEmployees,'id',id);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-outline-primary' onClick={handleClose}>
                        Cencel
                    </Button>
                    <Button className='btn btn-primary' onClick={() => deleteEmployees(id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Model