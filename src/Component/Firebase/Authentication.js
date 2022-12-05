import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';

const Authentication = () => {
    return initializeApp(firebaseConfig);
};

export default Authentication;