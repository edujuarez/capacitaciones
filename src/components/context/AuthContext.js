import React, { createContext, UseContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithRedirect } from 'firebase/auth'
import { auth, googleProvider } from '../googleSignIn/config';
import { Redirect } from "react-router-dom";



const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const createUser = signInWithRedirect(auth, googleProvider).then((data) => {
        localStorage.setItem("name", data.user.displayName)
        localStorage.setItem("photoUrl", data.user.photoURL)
        setUser(data.user)
        console.log(user)
        return <Redirect to="/login" replace={true} />
    })

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout }} >
            {children}
        </UserContext.Provider >
    )
}

export const UserAuth = () => {
    return UseContext(UserContext);
};

