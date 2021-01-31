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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = await firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    })
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = async (collections) => {
    const transformedCollection = await collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {});
    
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();



export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export default firebase;