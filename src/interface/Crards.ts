export interface Address {
	state?: string,
	country: string,
	city: string,
	street: string,
	houseNumber: number,
	zip?: number,
	_id?: string
}

export interface Image {
	url: string,
	alt: string,
	_id?: string
}


export interface Cards {

	_id?: string,
	title: string,
	subtitle?: string,
	description: string,
	phone: string,
	email: string,
	web?: string,
	image: Image,
	address: Address,
	bizNumber?: number,
	likes?: string[],
	user_id?: string,
	createdAt?: string,
	__v?: number
}

interface LikeButtonProps {

    cardId: string;

    userId: string;

    onLike: (cardId: string) => void;

}