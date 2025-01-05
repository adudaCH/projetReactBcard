import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
    exp: number;
    iat: number;
    [key: string]: any;
}

function useToken() {
    const token = localStorage.getItem("token");
    const [decodedToken, setAfterDecode] = useState<any>(null);

    useEffect(() => {
        const checkToken = () => {
            if (token) {
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 5000;

                    if (decoded.exp < currentTime) {
                        localStorage.removeItem("token");
                        setAfterDecode(null);
                    } else {
                        setAfterDecode(decoded);
                    }
                } catch (error) {
                    localStorage.removeItem("token");
                    setAfterDecode(null);
                }
            }
        };

        checkToken();

        const handleStorageChange = () => {
            checkToken();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [token]);

    return { decodedToken };
}

export default useToken;
