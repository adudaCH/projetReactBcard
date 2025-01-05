import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { User } from "../interface/User";
import { useUserContext } from "../contex/UserContext";
import { Link } from "react-router-dom";
import useToken from "../customeHooks/useToken";
import { deleteUserById, getAllUsers } from "../services/userServices";
import { errorMsg, successMsg } from "../services/toastify";
import Loading from "./Loading";
import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import DeleteUserModal from "./modals/DeleteUserModal";
import { Pagination } from "react-bootstrap";

const SandBox: React.FC = () => {
    const theme = useContext(ThemeContext);
    const { isAdmin } = useUserContext();
    const { decodedToken } = useToken();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const usersPerPage = 50;
    const totalPages = useMemo(
        () => Math.ceil((filteredUsers || users).length / usersPerPage),
        [filteredUsers, users]
    );
    const currentUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return (filteredUsers || users).slice(
            startIndex,
            startIndex + usersPerPage
        );
    }, [filteredUsers, users, currentPage]);

    useEffect(() => {
        if (isAdmin) {
            getAllUsers()
                .then(setUsers)
                .catch(() => errorMsg("Error fetching users"))
                .finally(() => setIsLoading(false));
        }
    }, [isAdmin]);

    const handleSearch = useCallback(
        (term: string) => {
            setSearchTerm(term.toLowerCase());
            setCurrentPage(1);
            if (term.trim()) {
                setFilteredUsers(
                    users.filter((user) => {
                        const fullName =
                            `${user.name.first} ${user.name.last}`.toLowerCase();
                        const email = user.email?.toLowerCase();
                        const phone = user.phone?.toLowerCase();
                        return (
                            fullName.includes(term) ||
                            email?.includes(term) ||
                            phone.includes(term)
                        );
                    })
                );
            } else {
                setFilteredUsers(null);
            }
        },
        [users]
    );

    const handleDelete = useCallback((userId: string) => {
        deleteUserById(userId)
            .then(() => {
                setUsers((prev) => prev.filter((user) => user._id !== userId));
                successMsg("User deleted successfully");
            })
            .catch(() => errorMsg("Error deleting user"));
    }, []);

    const renderUsersTable = () => (
        <table
            className="table table-striped"
            style={{ backgroundColor: theme.background, color: theme.color }}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Full Name</th>
                    {decodedToken?.isAdmin && (
                        <>
                            <th>Edit</th>
                            <th>Delete</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {currentUsers.map((user) => (
                    <tr key={user._id}>
                        <td>
                            <Link to={`/userDetails/${user._id}`}>
                                <img
                                    src={
                                        user.image?.imageUrl ||
                                        "/avatar-design.png"
                                    }
                                    alt={`${user.name.first}'s profile`}
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </Link>
                        </td>
                        <td>
                            {user.name.first} {user.name.last}
                        </td>
                        {decodedToken?.isAdmin && (
                            <>
                                <td>
                                    <Link to={`/userDetails/${user._id}`}>
                                        <button className="btn btn-warning">
                                            <FaPenFancy />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setSelectedUserId(
                                                user._id as string
                                            );
                                            setShowDeleteModal(true);
                                        }}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    if (isLoading) return <Loading />;

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="d-flex justify-content-between align-items-center">
                <h2>SandBox</h2>
                <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name/email/phone"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </form>
            </div>
            {filteredUsers?.length === 0 ? (
                <p>No users found</p>
            ) : (
                renderUsersTable()
            )}
            <Pagination>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                        key={i}
                        active={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <DeleteUserModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDelete={() => {
                    handleDelete(selectedUserId);
                    setShowDeleteModal(false);
                }}
                render={() => (
                    <div>Are you sure you want to delete this user?</div>
                )}
            />
        </main>
    );
};

export default SandBox;
