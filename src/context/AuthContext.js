import { createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    let token = localStorage.getItem('token') || null;
    const initialValue = token ? userFromToken(token) : null;

    const [ctxtUser, setCtxtUser] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    let asyncTimeout;
    const queryClient = useQueryClient();


    function ctxtlogin(res) {
        let token = localStorage.getItem('token');

        if (!token) {
            localStorage.setItem('token', res.token);
            token = res.token;
        }
        const tokenData = userFromToken(token)

        setCtxtUser({ ...tokenData })
    }

    function userFromToken(token) {
        const tokenData = parseJwt(token);
        return {
            token,
            userId: tokenData.userId,
            custName: tokenData.custName
        }
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    async function ctxtlogout() {
        setCtxtUser(null);
        localStorage.clear();
        queryClient.removeQueries();
    }

    function setLoadingScreen(value) {
        setLoading(value)
    }

    function setAsyncLoading(value) {
        if (value === true) {
            asyncTimeout = setTimeout(() => {
                console.log("In time out fn-------------setAsyncLoading");
                setLoading(true);
            }
                , 1000);
        }
        else {
            setTimeout(() => setLoading(false), 1000);
            clearTimeout(asyncTimeout);
        }
    }


    const value = {
        ctxtUser,
        ctxtlogin,
        ctxtlogout,
        loading,
        setLoadingScreen,
        setAsyncLoading
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}

