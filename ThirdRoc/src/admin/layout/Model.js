import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';;

const AssignToLender = ({ show, handleClose, handleShow }) => {

    const [Search, setSearch] = useState("");

    const AssignToLender = () => {
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title className='me-auto'>Assign To Lender</Modal.Title>
                    <i onClick={handleClose} className="fa fa-close ms-auto fs-4" style={{ cursor: "pointer" }}></i>
                </Modal.Header>
                <Modal.Body>

                    <div className="col-12">
                        <div className="form-group">
                            <div className="row g-xs">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search..." value={Search} onChange={(e) => setSearch(e.target.value)} />
                                    {/* <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span> */}
                                </div>
                            </div>
                        </div>

                        <div className='list_con'>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>Lender</ListGroup.Item>
                                <ListGroup.Item action>Lender</ListGroup.Item>
                                <ListGroup.Item action>Lender</ListGroup.Item>
                                <ListGroup.Item action>Lender</ListGroup.Item>
                                <ListGroup.Item action>Lender</ListGroup.Item>
                                <ListGroup.Item action>Lender</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    {/* <div className="btn-list">
                        <button onClick={handleClose} className="btn btn-outline-primary" >Cencel</button>
                    </div> */}
                    <Button variant="primary" onClick={() => AssignToLender()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AssignToLender;