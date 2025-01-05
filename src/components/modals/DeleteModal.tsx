import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../../services/toastify";
import { deleteCardById } from "../../services/cardsServices";


interface DeleteModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
    refresh: Function;
    productId: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
    show,
    onHide,
    onDelete,
    refresh,
    productId,
}) => {
    return (
        <div className="container">
            <Modal
                show={show}
                onHide={() => onHide()}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteCardById(productId)
                                .then(() => {
                                    onHide();
                                    refresh();
                                    successMsg("Item was successfully deleted");
                                })
                                .catch((err) => {
                                    throw new Error(err);
                                });
                        }}>
                        Delete
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onHide();
                        }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteModal;
