import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { User } from "../interface/User";
import { CustomJwtPayload, getUserDetails } from "../services/userServices";


export let tools = {
    user: {
        token: localStorage.token ?? "",
        loggedIn: localStorage.token !== undefined ? true : false,
        data: {}
    }
}


export const useUser = () => {
    let [user, setUser] = useState<User>()
    let payload = { isAdmin: false };
    if (localStorage.token != undefined) {
        payload = jwtDecode<CustomJwtPayload>(localStorage.token);
    }
    let [asChanged, setAsChanged] = useState<boolean>(false)


    useEffect(() => {
        if (tools.user.token) {
            getUserDetails(tools.user.token).then((res) => {
                setUser(res?.data)
            }).catch((err) => { throw new Error(err) }
            )
        }
    }, [asChanged])

    return { user, payload, setAsChanged, asChanged }
}