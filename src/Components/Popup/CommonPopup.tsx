
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import './CommonPopup.css';

interface PopupProps {
    show: boolean,
    handleClose: () => any,
    headerName: any,
    ClickedButton: any,
    performFuction: (input:string) => any
}
const CommonPopup = ({ show, handleClose, headerName, ClickedButton, performFuction }: PopupProps) => {

    const [amount, setAmount] = useState('');
    const [toaddress, setToAddress] = useState('');

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>{headerName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='inline-body-content'>
                        {ClickedButton == 'Transfer' ?
                            <>
                                < label >
                                    Transfer Amount:
                                    <input type="text" className='input-field' value={amount} onChange={e => setAmount(e.target.value)} />
                                </label>
                                <label>
                                    To Wallet Address:
                                    <input type="text" className='input-field' value={toaddress} onChange={e => setToAddress(e.target.value)} />
                                </label>

                            </> :
                            <>
                                <label>
                                    Sell Amount:
                                    <input type="text" className='input-field' value={amount} onChange={e => setAmount(e.target.value)} />
                                </label>
                                <label>
                                    To Wallet Address:
                                    <input type="text" className='input-field' value={toaddress} onChange={e => setToAddress(e.target.value)} />
                                </label>

                            </>

                        }


                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <>
                            <button className='invent-btns' onClick={handleClose}>Close</button>
                            <button className='invent-btns' onClick={(a)=>performFuction( ClickedButton == 'Transfer'? 'Transfer' : 'Sell')}>{ClickedButton == 'Transfer'? 'Transfer' : 'Sell'}</button>
                        </>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CommonPopup