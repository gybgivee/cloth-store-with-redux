import { initializeApp } from 'firebase/app';
import { getAuth, SignIn, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
//import { getFireStore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Initialize Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyBu9XWf_H68UZgXbA_ygiMcMVq4i8JNy3U",
  authDomain: "clothing-store-db-f3218.firebaseapp.com",
  projectId: "clothing-store-db-f3218",
  storageBucket: "clothing-store-db-f3218.appspot.com",
  messagingSenderId: "751134320748",
  appId: "1:751134320748:web:98a27cd9ef6a34be5e1049"
};

// create Authentication
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters(
  {
    prompt: "select_account"
  }
);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//create DB
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  //checking the exsitng of this object
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //check if the user exist, if not create the doc from userAuth in my collection in DB
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}


