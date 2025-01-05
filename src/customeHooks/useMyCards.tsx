import { useEffect, useState } from "react";
import { Cards } from "../interface/Crards";
import { getAllMyCards } from "../services/cardsServices";




export const useMyCards = (refresh: Function) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cards, setCards] = useState<Cards[]>([])


    useEffect(() => {
        getAllMyCards()
            .then((res) => {
                setCards(res.data)
                setIsLoading(false);
            })
            .catch((err) => {
                throw new Error(`Error: ${err}`);
            });
    }, [refresh]);

    return { cards, isLoading };
};