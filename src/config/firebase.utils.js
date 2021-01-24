import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB63bwhhZ93fHY1yqqzWtgYAvSfHCAV6mM",
    authDomain: "react-ecomm-4cb39.firebaseapp.com",
    projectId: "react-ecomm-4cb39",
    storageBucket: "react-ecomm-4cb39.appspot.com",
    messagingSenderId: "288524621521",
    appId: "1:288524621521:web:448f5abeaa4a133862d7f0",
    measurementId: "G-9RCKZ73PZE"
};



firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc('/users/' + userAuth.uid)
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(e){}
    }

    return userRef;

}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;