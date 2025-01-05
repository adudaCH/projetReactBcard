import axios, { AxiosRequestConfig } from "axios";
import { Cards } from "../interface/Crards";
import { errorMsg } from "./toastify";


const api: string = process.env.REACT_APP_API as string;

let getCards: AxiosRequestConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${api}/cards`,
    headers: {},
};

export const getAllCards = async (): Promise<Cards[]> => {
    try {
        const response = await axios.request(getCards);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch all cards");
    }
};

export const getLikedCardById = async (userId: string): Promise<any> => {
    try {
        const response = await axios.request({
            ...getCards,
            url: `${api}/cards?likes=${userId}`,
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch cards");
    }
};

export const updateLikeStatus = async (
    cardId: string,
    userId: string
): Promise<any> => {
    let token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found, please log in again");
    }

    const payload = {
        cardId,
        userId,
    };

    try {
        const updatedCard: Cards[] = await axios.request({
            method: "patch",
            url: `${api}/cards/${payload.cardId}?likes=${userId}`,
            headers: {
                "x-auth-token": token,
            },
            data: payload,
        });

        // Return the updated card data from the response
        return updatedCard;
    } catch (error) {
        throw new Error ("Failed to update like status");
    }
};

export const getMyCards = async (userId: string) => {
    let token = localStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }

    const response = await axios.request({
        ...getCards,
        headers: { "x-auth-token": token },
        url: `${api}/cards/my-cards?user_id=${userId}`,
    });

    return response.data;
};

export const createNewCard = async (card: Cards) => {
    let token = localStorage.getItem("token");
    let response: Cards = await axios.request({
        ...getCards,
        method: "post",
        headers: { "x-auth-token": token },
        data: card,
    });
    return response;
};

export const deleteCardById = async (cardId: string) => {
    const token: string | null = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${api}/cards/${cardId}`, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            errorMsg(
                `Internet connection error: ${error.response?.data || error.message
                }`
            );
        } else {
            errorMsg(`Unexpected error: ${error}`);
        }
    }
};

export async function userLikes(userId: string) {
    try {
        const cardsData = await getAllCards();

        if (cardsData.length > 0) {
            const userLikedCards = cardsData.filter((card: Cards) =>
                card.likes?.includes(userId)
            );
            return userLikedCards;
        }

        return [];
    } catch (error) {
        throw new Error(error as any);
        return [];
    }
}

export async function cardLikes(id: string) {
    let response = await getCardById(id);
    let cardData: string[] = response.data.likes;

    return cardData;
}


export async function like(id: string, userId: string) {
    try {

        let cardData: string[] = await cardLikes(id);

        if (cardData.includes(userId)) {
            cardData = cardData.filter((like) => like !== userId);
            await axios.patch(`${api}/cards/${id}`, {
                likes: cardData
            }, { headers: { 'x-auth-token': localStorage.token } });
        } else {
            await axios.patch(`${api}/cards/${id}`, {
                likes: cardData
            }, { headers: { 'x-auth-token': localStorage.token } });
           
        }
    } catch (error) {
        throw new Error(error as any);
    }
};

export function getCardById(id: string) {
    return axios.get(`${api}/cards/${id}`);
}

export const putCard = async (cardId: string, newCard: Cards) => {
    const token = localStorage.token;

    if (!token) {
        throw new Error("No authentication token found.");
        return;
    }

    try {
        const fullUrl = `${api}/cards/${cardId}`;
        const response = await axios.put(fullUrl, newCard, {
            headers: { "x-auth-token": token },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Unexpected Error: ${error}`);
    }
    throw new Error("Failed to update card.");
}




export function getAllMyCards() {
    return axios.get(`${api}/cards/my-cards`, { headers: { 'x-auth-token': localStorage.token } })
}

export function createCard(card: Cards) {


    return axios.post(`${api}/cards`, card, { headers: { 'x-auth-token': localStorage.token } })
}


export function deleteCard(cardId: string) {
    return axios.delete(`${api}/cards/${cardId}`, { headers: { 'x-auth-token': localStorage.token } })
}


// export function addCardToFavList(cardId:string){    
//     return axios.patch(`${api}/${cardId}`,undefined,{headers:{'x-auth-token':localStorage.getItem("token")}})
// }


// const addCardToFavListOn: Function = (cardId:string)=>{
//     addCardToFavList(cardId)
//     setIsFavorite(!isFavorite)
//   }