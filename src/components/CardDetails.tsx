import { FunctionComponent, SetStateAction, useCallback, useContext, useState } from "react";
import { useUserContext } from "../contex/UserContext";
import useCards from "../customeHooks/useCards";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../services/darkLightTheme";
import useToken from "../customeHooks/useToken";
import { Cards } from "../interface/Crards";
import Loading from "./Loading";
import DeleteModal from "./modals/DeleteModal";
import LikeButton from "./tools/LikeButton";
import { handleDeleteCard_Cards, handleLikeToggle_MyCards } from "../handelFunctions/cards";
import { Button } from "react-bootstrap";
import UpdateCardForm from "./UpdateCardForm";

interface CardDetailsProps {
    
}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
	const theme = useContext(ThemeContext);
    const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const {isAdmin, isLogedIn} = useUserContext();
	const {allCards, setCards} = useCards();
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const {decodedToken} = useToken();
	const {cardId} = useParams<string>();
	const navigate = useNavigate();
	const card = allCards?.find((card: Cards) => card._id === cardId);

    if (!card) return <Loading />;
    
    return ( <main
        style={{
            backgroundColor: theme.background,
            color: theme.color,
            minHeight: "100vh",
        }}>
            <Button  onClick={()=>navigate("/")}>Home</Button>
			<h6 className='lead display-5 mx-3 my-3'>Card Details</h6>
			<hr className=' w-25' />
			<div className='card-details-image'>
				<img
					className='img-fluid'
					src={card.image?.url}
					alt={card.image.alt}
					onMouseOver={(e) => {
						e.currentTarget.style.transform = "scale(1)";
					}}
				/>
			</div>
			<div className=' container d-flex w-25'>
				<p
					onClick={() =>
						handleLikeToggle_MyCards(
							card._id as string,
							decodedToken,
							allCards,
							setCards,
						)
					}
					className={`${
						card.likes?.includes(decodedToken?._id)
							? "text-danger"
							: "text-dark"
					} fs-2 text-end `}
				>
					<LikeButton cardId={""} userId={""} />
				</p>
				<sub>
					<p
						className={`${
							card.likes?.includes(decodedToken?._id)
								? "text-danger"
								: "text-dark"
						} mx-1 fs-5 text-end`}
					>
						{card.likes?.length}
					</p>
				</sub>
			</div>
			
			<div
				className='m-auto	custom-border rounded-3 card shadow overflow-hidden my-5 w-75 p-3'
				style={{
					backgroundColor: theme.background,
					color: theme.color,
				}}
			>
				<div className='card-body'>
					<h5 className='card-title text-center'>{card.title}</h5>
					<h6 className='card-subtitle text-center mb-2 text-secondary'>
						{card.subtitle}
					</h6>

					<hr className='w-50 m-auto' />
					<div className='row'>
						<div className='col-12'>
							<div className='card-text mt-5'>
								<h6>
									Phone\{" "}
									<a href={`tel:+972${card.phone.slice(1)}`}>
										{card.phone}
									</a>
								</h6>
								<hr className='w-25 border-danger' />
								<h6>
									Address\ {card.address.city}, {card.address.street}
								</h6>
								<hr className='w-25 border-danger' />
							</div>

							<div className='card-text'>
								<h6>description</h6>
								<hr className='w-25 border-danger' />
								<p className='lead '>{card.description}</p>
							</div>
						</div>
						<div className='row'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13424.14129243641!2d35.176770531207595!3d32.7382527280794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db255b165af1b%3A0x229654d621e08c5e!2z15TXqNeZINeg16bXqNeqINeq15nXqNei158!5e0!3m2!1siw!2sil!4v1734360541093!5m2!1siw!2sil'
								width='400'
								height='350'
								className='border-0'
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							></iframe>
						</div>
					</div>

					<>
						{((isLogedIn && isAdmin) ||
							(isLogedIn && card.user_id === decodedToken._id)) && (
							<div className='card-footer bg-dark'>
								<button
									onClick={() => {
										onShowDeleteCardModal();
										setCardToDelete(card._id as string);
									}}
									className='btn btn-danger'
								>
									Delete
								</button>
							</div>
						)}
					</>
				</div>
			</div>
			<div className='container-sm'>
				<hr className=' mb-4' />
				<h6 className=' display-6 mx-3'>Edit Card</h6>
				{isAdmin || (isLogedIn && card.user_id === decodedToken._id) ? (
					<UpdateCardForm refresh={() => {}} />
				) : null}
			</div>
			<DeleteModal
                show={showDeleteModal}
                onHide={() => onHideDeleteCardModal()}
				refresh={() => {}}
				productId={cardToDelete as string}
				onDelete={() => {
					handleDeleteCard_Cards(
						cardToDelete as string,
						setCards((prev) => prev.filter((c) => c._id !== cardToDelete)),
					);
				}}
			/>
        </main> );
}

export default CardDetails;