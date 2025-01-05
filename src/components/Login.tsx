import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contex/UserContext";

import { getUserById, loginIn } from "../services/userServices";
import { errorMsg, successMsg } from "../services/toastify";
import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import { UserLogin } from "../interface/User";
import { jwtDecode } from "jwt-decode";
import { ThemeContext } from "../services/darkLightTheme";
import useToken from "../customeHooks/useToken";
import Loading from "./Loading";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isAdmin, auth, setAuth, setIsAdmin, setIsBusiness, setIsLogedIn } =
        useUserContext();
    const { decodedToken } = useToken();

    useEffect(() => {
        if (decodedToken && localStorage.token) {
            setIsLogedIn(true);
        } else {
            setIsLogedIn(false);
            return;
        }
    }, [decodedToken]);

    useEffect(() => {
        if (decodedToken && decodedToken._id)
            getUserById(decodedToken._id)
                .then(() => {
                    setAuth({ ...decodedToken, isAdmin: isAdmin });
                    setIsAdmin(decodedToken.isAdmin);
                    setIsBusiness(auth?.isBusiness as boolean);
                    setIsLogedIn(true);
                    setIsLoading(false);
                })
                .catch((err) => {
                    errorMsg("Failed to find user");
                    setIsLoading(false);
                    return;
                });
    }, []);

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format")
            .min(5, "Email must be at least 5 characters long"),
        password: yup
            .string()
            .required("Password is required")
            .min(7, "Password must be at least 7 characters long")
            .max(20, "Password must be at most 20 characters long"),
    });
    const formik: FormikValues = useFormik<UserLogin>({
        initialValues: { email: "", password: "" },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            loginIn(values)
                .then((res) => {
                    setIsLoading(false);
                    localStorage.setItem("token", res.data);
                    navigate("/");
                    successMsg(`Welcome Back! 🥰`);
                })
                .catch((err) => {
                    setIsLoading(false);
                    errorMsg("Login failed, please try again.");
                });
        },
    });


    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div
                    className="container w-25 p-4 shadow-lg rounded"
                    style={{ backgroundColor: theme.background || "#fff" }}>
                    <h1 className="poppins-regular text-center mb-4">LOGIN</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className={`form-control ${
                                    formik.touched.email && formik.errors.email
                                        ? "is-invalid"
                                        : ""
                                }`}
                                id="floatingInput2"
                                placeholder="name@example.com"
                                value={formik.values.email}
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInput2">
                                Email address
                            </label>
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${
                                    formik.touched.password &&
                                    formik.errors.password
                                        ? "is-invalid"
                                        : ""
                                }`}
                                id="floatingPassword"
                                placeholder="Password"
                                value={formik.values.password}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <div className="invalid-feedback">
                                        {formik.errors.password}
                                    </div>
                                )}
                        </div>
                        <button
                            className="btn btn-dark mt-3 w-100"
                            type="submit"
                            disabled={!formik.dirty || !formik.isValid}>
                            Login
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        <Link to="/register">New user? Register now</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
