import { FunctionComponent, useContext, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import { User } from "../interface/User";
import { ThemeContext } from "../services/darkLightTheme";
import { userInitialValues } from "../services/registerValuse";
import { errorMsg, successMsg } from "../services/toastify";
import { registerNewUser } from "../services/userServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const theme = useContext(ThemeContext);

    const formik: FormikValues = useFormik<User>({
        initialValues: userInitialValues,
        validationSchema: yup.object({
            name: yup.object({
                first: yup
                    .string()
                    .required("First name is required")
                    .min(2, "First name must be at least 2 characters"),
                middle: yup.string(),
                last: yup
                    .string()
                    .required("Last name is required")
                    .min(2, "Last name must be at least 2 characters"),
            }),
            phone: yup
                .string()
                .required("Phone number is required")
                .matches(
                    /^05\d{8}$/,
                    "Phone number must be a valid Israeli number"
                ),
            email: yup
                .string()
                .required("Email is required")
                .email("Must be a valid email address")
                .matches(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Email must be a valid email address"
                ),
            password: yup
                .string()
                .required("Password is required")
                .min(9, "Password must be at least Nine characters")
                .max(20, "Password must be at most Twenty characters")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
                    "Password must include an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-"
                ),
            image: yup.object({
                url: yup.string().url("Must be a valid URL"),
                alt: yup.string(),
            }),
            address: yup.object({
                state: yup.string(),
                country: yup.string().required("Country is required"),
                city: yup.string().required("City is required"),
                street: yup.string().required("Street is required"),
                houseNumber: yup
                    .number()
                    .required("House number is required")
                    .min(0, "House number must be positive"),
                zip: yup.number(),
            }),
            isBusiness: yup.boolean(),
        }),
        onSubmit: (values) => {
            registerNewUser(values)
                .then(() => {
                    successMsg("Welcome To BCard, good to have you here!");
                    navigate("/login");
                })
                .catch((err) => errorMsg(`Error: ${err}`));
        },
    });

    return (
        <main
            style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh"}}>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row w-75">
                    <div className="col-md-12  text-center">
                        <h2 className="poppins-regular mb-4">REGISTER</h2>
                    </div>
                    <div className="col-md-12">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="first" className="form-label">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="first"
                                    placeholder="First name"
                                    value={formik.values.name.first}
                                    name="name.first"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name?.first &&
                                    formik.errors.name?.first && (
                                        <p className="text-danger">
                                            {formik.errors.name.first}
                                        </p>
                                    )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="middle" className="form-label">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="middle"
                                    placeholder="Middle name"
                                    value={formik.values.name.middle}
                                    name="name.middle"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="last" className="form-label">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="last"
                                    placeholder="Last name"
                                    value={formik.values.name.last}
                                    name="name.last"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name?.last &&
                                    formik.errors.name?.last && (
                                        <p className="text-danger">
                                            {formik.errors.name.last}
                                        </p>
                                    )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">
                                    Phone *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="050-0000000"
                                    value={formik.values.phone}
                                    name="phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone &&
                                    formik.errors.phone && (
                                        <p className="text-danger">
                                            {formik.errors.phone}
                                        </p>
                                    )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="example@email.com"
                                    value={formik.values.email}
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email &&
                                    formik.errors.email && (
                                        <p className="text-danger">
                                            {formik.errors.email}
                                        </p>
                                    )}
                            </div>
                            <div className="col-md-6 position-relative">
                                <label
                                    htmlFor="password"
                                    className="form-label">
                                    Password *
                                </label>
                                <div className="position-relative">
                                    
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        } 
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        className="btn position-absolute end-0 top-50 translate-middle-y"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            padding: "0 10px",
                                            zIndex: 10, 
                                        }}>
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {formik.touched.password &&
                                    formik.errors.password && (
                                        <p className="text-danger">
                                            {formik.errors.password}
                                        </p>
                                    )}
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="imageUrl"
                                    className="form-label">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageUrl"
                                    placeholder="https://example.com/image.jpg"
                                    value={formik.values.image.url}
                                    name="image.url"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="imageAlt"
                                    className="form-label">
                                    Image Alt
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageAlt"
                                    placeholder="Image description"
                                    value={formik.values.image.alt}
                                    name="image.alt"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="state" className="form-label">
                                    State
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    placeholder="State"
                                    value={formik.values.address.state}
                                    name="address.state"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="country" className="form-label">
                                    Country *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    placeholder="Country"
                                    value={formik.values.address.country}
                                    name="address.country"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="City"
                                    value={formik.values.address.city}
                                    name="address.city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="street" className="form-label">
                                    Street *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    placeholder="Street"
                                    value={formik.values.address.street}
                                    name="address.street"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="houseNumber"
                                    className="form-label">
                                    House Number *
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="houseNumber"
                                    placeholder="123"
                                    value={formik.values.address.houseNumber}
                                    name="address.houseNumber"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="zip" className="form-label">
                                    ZIP
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="zip"
                                    placeholder="12345"
                                    value={formik.values.address.zip}
                                    name="address.zip"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-12 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isBusiness"
                                    checked={formik.values.isBusiness}
                                    name="isBusiness"
                                    onChange={formik.handleChange}
                                />
                                <label
                                    htmlFor="isBusiness"
                                    className="form-check-label">
                                    Signup as business
                                </label>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-danger w-100"
                                    type="reset">
                                    CANCEL
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={!formik.dirty || !formik.isValid}>
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
