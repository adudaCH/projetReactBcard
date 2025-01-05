import {
    createContext,
    useContext,
    useState,
    ReactNode,
    FunctionComponent,
} from "react";

import { Cards } from "../interface/Crards";
import FavCards from "../components/FavCards";

interface FavCardsContextType {
    favoriteCards: Cards[] | null;
    setFavoriteCards: React.Dispatch<React.SetStateAction<Cards[] | null>>;
}

const FavCardsContext = createContext<FavCardsContextType | null>(null);

export const useFavCardsContext = () => {
    const context = useContext(FavCardsContext);
    if (!context) {
        throw new Error("FavCardsContext must be used within a cardsProvider");
    }
    return context;
};

interface FavCardsProviderProps {
    children: ReactNode;
}

export const FavCardsProvider: FunctionComponent<FavCardsProviderProps> = ({
    children,
}) => {
    const [favoriteCards, setFavoriteCards] = useState<Cards[] | null>([]);

    return (
        <FavCardsContext.Provider
            value={{
                favoriteCards,
                setFavoriteCards,
            }}>
            {children}
        </FavCardsContext.Provider>
    );
};
