import { FunctionComponent, useEffect, useState } from "react";
import { cardLikes, like } from "../../services/cardsServices";
import { useCardContext } from "../../contex/useCardContext";

interface LikeButtonProps {
    cardId: string;
    userId: string;
    onLikeClick?: (arg: any) => void;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({
    cardId,
    userId,
    onLikeClick,
}) => {
    const [asLike, setAsLike] = useState<boolean>(false);
    const { updateCardLikes } = useCardContext();

    useEffect(() => {
        const fetchLikes = async () => {
            const likes = await cardLikes(cardId);
            setAsLike(likes.includes(userId));
        };
        fetchLikes();
    }, [cardId, userId]);

    const handleLikeClick = async () => {
        updateCardLikes(cardId, userId);
        setAsLike(!asLike);
        let res = await like(cardId, userId);
        if (res && res._id && onLikeClick) {
            onLikeClick(res);
        } else {
            throw new Error("Failed to like card");
        }
    };

    return (
        <>
            {asLike ? (
                <i onClick={handleLikeClick} className="fa-solid fa-heart"></i>
            ) : (
                <i
                    onClick={handleLikeClick}
                    className="fa-regular fa-heart"></i>
            )}
        </>
    );
};

export default LikeButton;
