

export interface UserInitialValues {
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    imageUrl: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
}

export const userInitialValues = {
    name: { first: "", middle: "", last: "" },
    phone: "",
    email: "",
    password: "",
    image: { url: "", alt: "" },
    address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
    },
    isBusiness: false,
};
