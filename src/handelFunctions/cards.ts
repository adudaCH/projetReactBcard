import { useNavigate } from "react-router-dom";
import { Cards } from "../interface/Crards";
import { deleteCardById, updateLikeStatus } from "../services/cardsServices";
import { User } from "../interface/User";

export const handleLike_Cards = (
	cardId: string,
	cards: Cards[],
	userId: string,
	cardsSetter: Function,
) => {
	const updatedCards = cards.map((card: any) => {
		if (card._id === cardId) {
			const isLiked = card.likes.includes(userId);

			if (isLiked) {
				
				card.likes = card.likes.filter((id: string) => id !== userId);
			} else {
			
				card.likes.push(userId);
			}

		
			updateLikeStatus(cardId, userId as string).catch((err) => {
				throw new Error("Failed to update like status:", err);
			});
		}
		return card;
	});
	cardsSetter(updatedCards);
};

export const HandleNvgCard = (route: string, cardId: string): string=> {
    const navigate = useNavigate();
    navigate(route); 
	return route.replace(":cardId", cardId);
};

export const handleLikeToggle_MyCards = (
	cardId: string,
	user: User,
	cards: Cards[],
	cardsSetter: Function,
) => {
	if (!user || !user._id) return;

	const updatedCards = cards.map((card: any) => {
		if (card._id === cardId) {
			const isLiked = card.likes.includes(user._id);
			const updatedLikes = isLiked
				? card.likes.filter((id: string) => id !== user._id)
				: [...card.likes, user._id];

			return {...card, likes: updatedLikes};
		}
		return card;
	});
	cardsSetter(updatedCards);
	updateLikeStatus(cardId, user._id).catch((err) => {
		throw new Error("Failed to update like status:", err);
	});
};

export const handleDeleteCard_Cards = (id: string, cardsSetter: void) => {
	deleteCardById(id)
		.then(() => cardsSetter)
		.catch((err) => {
			throw new Error(err);
		});
};


