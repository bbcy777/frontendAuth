import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

//Create Context
const AuthContext = createContext()

//Create Context Provider
export const UserProvider = ({ children }) => {
    //Create Cookies
    const [cookies, setCookies, removeCookie] =  useCookies();

    //Login Function
    const login = async (formData) => {
        try {
            //Make a call to the backend
            let res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/auth',
                data: formData
            })

            setCookies('token', res.data.token)
        } catch (err) {
            console.error(err)
        }
    }
    //SignUp Function
    const signUp = async (formData) => {
        try {
            let res = await axios ({
                method: 'POST',
                url: 'http://localhost:3000/api/users',
                data: formData
            })

            setCookies('token', res.data.token);
        } catch (err) {
            console.error(err)
        }
    }

    //LogOut Function
    const logOut = () => {
        ['token'].forEach((obj) => removeCookie(obj))
    };

    const value = useMemo(()=>({
        cookies, login, logOut, signUp,
    }), [cookies])
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

//Invoke useContext in a function so in other components you don't have to import both useContext and the context itself. You only import useAuth, One and done
export const useAuth = () => {
    return useContext(AuthContext)
}