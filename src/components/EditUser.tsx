import {
    useState,
    useEffect,
    FunctionComponent,
    useContext,
    SetStateAction,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    putUserData,
    getUserById,
    deleteUserById,
} from "../services/userServices";
import * as yup from "yup";
import { useFormik, FormikValues } from "formik";
import { User } from "../interface/User";
import { errorMsg, successMsg } from "../services/toastify";
import { ThemeContext } from "../services/darkLightTheme";
import { Button } from "react-bootstrap";
import Loading from "./Loading";
import DeleteModal from "./modals/DeleteModal";
import CardsInput from "./modals/CardsInput";

interface EditUserProps {}

const EditUser: FunctionComponent<EditUserProps> = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<string>("");
    const [user, setUser] = useState<User>({
        name: { first: "", middle: "", last: "" },
        phone: "",
        email: "",
        password: "",
        address: {
            state: "",
            city: "",
            country: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
        image: { imageUrl: "", alt: "" },
        isBusiness: false,
    });

    const { userId } = useParams<string>();
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    const onShowDeleteCardModal = () => setShowDeleteModal(true);
    const onHideDeleteCardModal = () => setShowDeleteModal(false);

    const formik: FormikValues = useFormik<User>({
        enableReinitialize: true,
        initialValues: {
            name: { ...user.name },
            phone: user.phone,
            email: user.email,
            password: user.password,
            image: { ...user.image },
            address: { ...user.address },
            isBusiness: user.isBusiness,
        },
        validationSchema: yup.object().shape({
            name: yup.object().shape({
                first: yup
                    .string()
                    .min(2)
                    .max(256)
                    .required("First name is required"),
                middle: yup.string().min(2).max(256).optional(),
                last: yup
                    .string()
                    .min(2)
                    .max(256)
                    .required("Last name is required"),
            }),
            phone: yup
                .string()
                .min(9, "Phone number must be at least 9 digits long")
                .max(14, "Phone number must be at most 14 digits long")
                .required("Phone number is required"),
            email: yup
                .string()
                .email("Please provide a valid email")
                .required("Email is required"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password is required"),
            image: yup.object().shape({
                imageUrl: yup
                    .string()
                    .min(14, "Image URL must be at least 14 characters long")
                    .url("Please provide a valid URL")
                    .optional(),
                alt: yup.string().min(2).optional(),
            }),
            address: yup.object().shape({
                state: yup.string().min(2).optional(),
                country: yup.string().min(2).required("Country is required"),
                city: yup.string().min(2).required("City is required"),
                street: yup.string().min(2).required("Street is required"),
                houseNumber: yup
                    .number()
                    .min(1)
                    .required("House number is required"),
                zip: yup.number().min(2).required("Zip code is required"),
            }),
        }),
        onSubmit: (values: User) => {
            putUserData(userId as string, values)
                .then(() => {
                    setUser(values);
                    successMsg(
                        `${values.name.first} has been updated successfully.`
                    );
                })
                .catch(() => errorMsg("Error updating user details."));
        },
    });

    useEffect(() => {
        if (!userId) return;

        setIsLoading(true);
        getUserById(userId)
            .then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                errorMsg("Error fetching user details");
                setIsLoading(false);
            });
    }, [userId]);

    const handleDelete = () => {
        deleteUserById(userId as string)
            .then(() => {
                navigate("/sand-box");
                successMsg("User deleted successfully.");
            })
            .catch(() => errorMsg("Error deleting user."));
    };

    if (isLoading) return <Loading />;

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <Button onClick={() => navigate("/sand-box")}>Back</Button>
            <div className="container">
                <div className="row mp-5 fw-bold lead">
                    <div className="col-12">
                        <p className="fs-1 lead mt-5">
                            {user.isBusiness ? "Business" : "Client"}
                        </p>
                    </div>
                    <div className="col-12">
                        <img
                            src={user.image?.imageUrl}
                            alt={user.image?.alt}
                            className="img-fluid rounded-5 my-4"
                            style={{ maxWidth: "20rem" }}
                        />
                    </div>
                    <div className="col-12">
                        <p className="lead">
                            {user.name.first} {user.name.last}
                        </p>
                    </div>
                    <div className="col-12">
                        <p className="-emphasis">{user.email}</p>
                    </div>
                    <div className="col-12">
                        <p className="lead">
                            {user.address.country}, {user.address.city}
                        </p>
                    </div>
                </div>
                <h6 className="lead">Edit User</h6>
                <form
                    onSubmit={formik.handleSubmit}
                    className="border shadow-lg p-4 rounded-3"
                    data-bs-theme="dark">
                    {/* Map CardsInput for reusable form fields */}
                    <button
                        type="submit"
                        className="btn btn-success w-100 py-2 mt-3"
                        disabled={!formik.dirty || !formik.isValid}>
                        Update
                    </button>
                </form>
                <DeleteModal
                    show={showDeleteModal}
                    onHide={onHideDeleteCardModal}
                    onDelete={handleDelete}
                    refresh={() => {}}
                    productId={""}
                />
            </div>
        </main>
    );
};

export default EditUser;
