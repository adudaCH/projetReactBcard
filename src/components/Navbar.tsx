import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Navbar as BootstrapNavbar,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import {
    FaUserCircle,
    FaSearch,
    FaMoon,
    FaSun,
    FaArrowAltCircleRight,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrLogin, GrLogout } from "react-icons/gr";
import { ThemeContext, themeMode } from "../services/darkLightTheme";
import { useUserContext } from "../contex/UserContext";
import useToken from "../customeHooks/useToken";
import { getAllUsers } from "../services/userServices";
import { errorMsg } from "../services/toastify";

interface NavbarProps {
    changeMode: Function;
    cardList: Array<{ id: string; name: string; description: string }>; // Card data for search
}

const Navbar: FunctionComponent<NavbarProps> = ({ changeMode, cardList }) => {
    const navigate = useNavigate();
    const {
        isAdmin,
        isLogedIn,
        setAuth,
        setIsAdmin,
        setIsBusiness,
        setIsLogedIn,
    } = useUserContext();
    const theme = useContext(ThemeContext);
    const { decodedToken } = useToken();
    const [user, setUser] = useState<{
        name: { first: string; last: string };
    } | null>(null);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCards, setFilteredCards] = useState(cardList);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users: {
                    _id: string;
                    name: { first: string; last: string };
                }[] = await getAllUsers();

                const loggedInUser = users.find(
                    (u) => u._id === decodedToken?._id
                );
                setUser(loggedInUser || null);
            } catch (error) {
                errorMsg("Failed to fetch users.");
            }
        };
        if (isLogedIn && decodedToken?._id) {
            fetchUsers();
        }
    }, [isLogedIn, decodedToken]);

    useEffect(() => {
        if (decodedToken) {
            setAuth(decodedToken);
            setIsLogedIn(true);
            setIsAdmin(decodedToken.isAdmin);
            setIsBusiness(decodedToken.isBusiness);
        } else {
            setIsLogedIn(false);
            setIsAdmin(false);
        }
    }, [decodedToken, setAuth, setIsLogedIn, setIsAdmin, setIsBusiness]);

    useEffect(() => {
        setFilteredCards(
            cardList.filter(
                (card) =>
                    card.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    card.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, cardList]);

    const loggedOut = () => {
        setAuth(null);
        setIsAdmin(false);
        setIsBusiness(false);
        setIsLogedIn(false);
        localStorage.removeItem("token");
        navigate("/");
    };

    const loginHandler = () => {
        if (!isLogedIn) {
            navigate("/login");
        } else {
            navigate("/profile");
        }
    };

    return (
        <BootstrapNavbar
            bg="dark"
            expand="lg"
            className="navbar navi navbar-dark">
            <BootstrapNavbar.Brand className="antonFont">
                <NavLink className={"nav-link"} to="/">
                    BCard
                </NavLink>
            </BootstrapNavbar.Brand>

            <BootstrapNavbar.Toggle aria-controls="navbar-nav" />

            <BootstrapNavbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <NavLink className={"nav-link"} to="/about">
                        About
                    </NavLink>
                    {isLogedIn && (
                        <>
                            <NavLink className={"nav-link"} to="/fav-cards">
                                Fav Cards
                            </NavLink>
                            <NavLink className={"nav-link"} to="/my-cards">
                                My Cards
                            </NavLink>
                        </>
                    )}

                    {isAdmin && (
                        <NavLink className={"nav-link"} to="/sandbox">
                            Sandbox
                        </NavLink>
                    )}
                </Nav>

                <Form className="d-flex me-3">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-light">
                        <FaSearch />
                    </Button>
                </Form>

                <Nav>
                    <div className="d-flex align-items-center justify-content-center">
                        <Button
                            style={{ color: theme.color }}
                            className="navIcon "
                            onClick={() => changeMode()}>
                            <FaMoon className="navIcon" />
                        </Button>
                        <Button className="navIcon" onClick={loginHandler}>
                            {!isLogedIn ? (
                                <FaUserCircle />
                            ) : (
                                <div className="userIcon d-flex justify-content-center align-items-center">
                                    <img
                                        style={{ height: "26px" }}
                                        src="user.png"
                                        alt="user"
                                    />
                                </div>
                            )}
                        </Button>
                        <Button
                            className="navIcon"
                            onClick={() => {
                                if (isLogedIn) {
                                    loggedOut();
                                } else {
                                    navigate("/login");
                                }
                            }}>
                            {isLogedIn ? (
                                <GrLogout className="navIcon" />
                            ) : (
                                <GrLogin className="navIcon" />
                            )}
                        </Button>
                    </div>
                </Nav>
            </BootstrapNavbar.Collapse>

            {searchQuery && (
                <div className="search-results bg-light p-3 rounded">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card) => (
                            <div key={card.id} className="p-2 border-bottom">
                                <strong>{card.name}</strong>: {card.description}
                            </div>
                        ))
                    ) : (
                        <p>No matching cards found.</p>
                    )}
                </div>
            )}
        </BootstrapNavbar>
    );
};

export default Navbar;
