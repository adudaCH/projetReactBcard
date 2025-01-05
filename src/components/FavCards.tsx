import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import useToken from "../customeHooks/useToken";
import { Cards } from "../interface/Crards";
import { getLikedCardById, userLikes } from "../services/cardsServices";
import { errorMsg } from "../services/toastify";
import { handleLike_Cards, HandleNvgCard } from "../handelFunctions/cards";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

import LikeButton from "./tools/LikeButton";
import { useUser } from "../customeHooks/useUser";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
    const [cards, setCards] = useState<Cards[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    let { user } = useUser();
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedCards = async () => {
            const liked: Cards[] = await userLikes(user?._id as string);
            setCards(liked);

            if (liked.length) {
                setLoading(false);
            }
        };
        fetchLikedCards();
    }, [user?._id]);

    if (loading) return <Loading />;
    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container">
                <h2 className="poppins-regular text-center pt-3">
                    My Favorite Business Cards
                </h2>
                <div className="row">
                    {cards.length > 0 &&
                        cards.map((card: Cards) => {
                            loading && setLoading(false);
                            return (
                                <div
                                    key={card._id}
                                    className="col-12 col-md-6 col-xl-4 my-3">
                                    <div
                                        style={{
                                            backgroundColor: theme.background,
                                            color: theme.color,
                                        }}
                                        className="card w-100 rounded-lg overflow-hidden">
                                        <img
                                            className="card-img-top"
                                            src={card.image.url}
                                            alt={card.image.alt}
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/images/defaultBusinessImage.jpg";
                                            }}
                                            style={{
                                                objectFit: "cover",
                                                height: "300px",
                                                transition:
                                                    "transform 0.3s ease",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform =
                                                    "scale(1.1)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform =
                                                    "scale(1)";
                                            }}
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {card.title}
                                            </h5>
                                            <p className="card-subtitle text-center mb-2 text-muted">
                                                {card.subtitle}
                                            </p>
                                            <hr />
                                            <p className="card-text text-start lead fw-bold">
                                                Phone: {card.phone}
                                            </p>
                                            <p className="card-text text-start lead fw-bold">
                                                City: {card.address.city}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="likes-container d-flex align-items-center">
                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                theme.background,
                                                            color: theme.color,
                                                        }}
                                                        onClick={() =>
                                                            handleLike_Cards(
                                                                card._id as string,
                                                                cards,
                                                                user?._id as string,
                                                                setCards
                                                            )
                                                        }
                                                        className={`${
                                                            card.likes?.includes(
                                                                user?._id as string
                                                            )
                                                                ? "text-danger"
                                                                : "text-light"
                                                        } fs-5 rounded-5`}>
                                                        <LikeButton
                                                            cardId={
                                                                card._id as string
                                                            }
                                                            userId={
                                                                user?._id as string
                                                            }
                                                        />
                                                        <sub
                                                            className={`${
                                                                card.likes?.includes(
                                                                    user?._id as string
                                                                )
                                                                    ? "text-danger"
                                                                    : "text-light"
                                                            } mx-1 fs-5`}>
                                                            {card.likes?.length}
                                                        </sub>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </main>
    );
};

export default FavCards;
