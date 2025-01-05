import { ReactNode } from "react";
import { Address, Image } from "./Crards";
export interface User {
	_id?: "";
	name: {
		first: string;
		middle?: string;
		last: string;
	};
	phone: string;
	email: string;
	password: string;
	image?: {
		imageUrl?: string;
		alt?: string;
	};
	address: {
		state?: string;
		country: string;
		city: string;
		street: string;
		houseNumber: number;
		zip: number;
	};
	isBusiness: boolean;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface Name {
    first: string,
    middle?: string,
    last: string
}

export interface EditUserType {
    email: ReactNode;
    _id?: string,
    name: Name,
    phone: string,
    image: Image,
    address: Address,
    isBusiness: boolean
}
