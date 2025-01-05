import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import AddNewCardModal from "./modals/AddNewCardModal";
import DeleteModal from "./modals/DeleteModal";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Cards } from "../interface/Crards";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { deleteCard, getMyCards } from "../services/cardsServices";
import useToken from "../customeHooks/useToken";
import { ThemeContext } from "../services/darkLightTheme";
import Loading from "./Loading";
import { HandleNvgCard } from "../handelFunctions/cards";
import LikeButton from "./tools/LikeButton";
import { useMyCards } from "../customeHooks/useMyCards";
import { successMsg } from "../services/toastify";


const MyCards: FunctionComponent = () => {
    const theme = useContext(ThemeContext);
    const { decodedToken } = useToken();
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    let [flag, setFlag] = useState<boolean>(false);
    let [cardId, setCardId] = useState<string>('');
    const navigate: NavigateFunction = useNavigate()

    let handleAddProduct = () => {
        setOpenAddModal(true);
    };

    let handleEditProduct = () => {
        setOpenEditModal(true);
    };
    const [cardToDelete, setCardToDelete] = useState<string>("");


    let refresh = () => {
        setFlag(!flag)
    };
    

    let { cards, isLoading } = useMyCards(refresh)

    const handleDeleteCard_Cards = (cardId: string) => {
        if (window.confirm("This card would be DELETED permanently!!. do you want to Delete this card?")) {
            deleteCard(cardId).then(() => {
                successMsg("Your Card as been DELETED successfully");
                refresh()
            }).catch((error) => {
                throw new Error(error);
            });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container py-5 text-center">
                <h2 className="lead poppins-regular" style={{ fontSize: "1.9rem" }}>My Cards</h2>
                <hr className="border-light" />
                <div className="w-100">
                    <button
                        className="w-25 bg-info ml-3 mt-2"
                        onClick={() => handleAddProduct()}>
                        Add Card
                    </button>
                </div>
                <div className="container">
                    <div className="row sm-auto">
                        {cards.length > 0 ? (
                            cards.map((card: Cards, index: number) => (
                                <div
                                    key={index}
                                    className="col-12 col-md-6 col-xl-4 my-3">
                                    <div className="card">


                                        <img
                                            className="img-card-top"
                                            src={
                                                card.image?.url ||
                                                '/images/defaultBusinessImage.jpg'
                                            }
                                            alt={
                                                card.image?.alt || "Card Image"
                                            }

                                            onError={(e) => {
                                                e.currentTarget.src = '/images/defaultBusinessImage.jpg'
                                            }}
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {card.title}
                                            </h5>
                                            <p className="card-subtitle text-center mb-2 text-light-emphasis">
                                                {card.subtitle}
                                            </p>
                                            <hr />
                                            <p className="card-text text-start lead fw-bold">
                                                Phone: {card.phone}
                                            </p>
                                            <div className="text-start lead fw-bold">
                                                Address:
                                                <hr className="w-25" />
                                                <span>{card.address.state}</span>,{" "}
                                                <span>{card.address.city}</span>
                                                <p>
                                                    {card.address.street},{" "}
                                                    <span>
                                                        {card.address.houseNumber}
                                                    </span>
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <LikeButton
                                                    cardId={card._id as string}
                                                    userId={decodedToken._id}
                                                />
                                                <div className="mt-3 d-flex justify-content-around">

                                                    <button
                                                        className="text-danger"
                                                        onClick={() => {
                                                            handleDeleteCard_Cards(card._id as string)

                                                        }}>
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="lilita-one-regular text-center my-5">no cards to show yet 🙄</div>
                        )}
                    </div>
                </div>
                <AddNewCardModal
                    onHide={() => setOpenAddModal(false)} refresh={refresh} show={openAddModal}
                />
            </div>
        </main>
    );
};

export default MyCards;
