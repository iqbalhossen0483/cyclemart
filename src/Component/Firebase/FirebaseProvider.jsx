import React, { createContext } from 'react';
import Firebase from './Firebase';

export const AuthFirebase = createContext();

const FiebaseProvider = ({ children }) => {
    const auth = Firebase();
    return <AuthFirebase.Provider value={auth}>
        {children}
    </AuthFirebase.Provider>
};

export default FiebaseProvider;