
import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidErrorCircle } from "react-icons/bi";

interface DeleteModalProps {
    show: boolean;
    onHide: Function;
    onDelete: Function;
    render: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
    onHide,
    show,
    onDelete,
    render,
}) => {
    const navigate = useNavigate();
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="h5 text-danger fw-bold">
                        <p className=" fs-1">
                            <BiSolidErrorCircle />
                        </p>
                        warning you sure want to delete this ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            onDelete();
                            render();
                            onHide()
                        }}>
                        DELETE
                    </Button>
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        );
    };


export default DeleteModal;
