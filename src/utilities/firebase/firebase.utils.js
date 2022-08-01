/*
the reason we create the interface because if the third party libary change the way how they call the method etc
instead of go through an entire application and change them all, this way will help us minimize the impact of changes
*/
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
  {
    prompt: "select_account"
  }
);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
//create DB
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
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
        createAt,
        ...additionalInfo

      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)

}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser=()=>signOut(auth);

export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth,callback);
/* onAuthStateChanged(auth,callback) =>  onAuthStateChanged(auth,callback,errorCallback,completeCallback)
auth listener observe pattern
1.next after subsribe call this call back
2. if is error call this errorCallback
3.when complete call this callback
 */

//add collection => collectionKey : collection name/objectToAdd : object in db; could have another argument field,field='title'
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
    //in this case we want title to be a name of the each table or could do like this object[field]
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () =>{
  //need to be the same key when setting add colections
  const collectionRef = collection(db, 'categories');
  const getQuery = query(collectionRef);

  const querySnapshot = await getDocs(getQuery);
  //to make a object of array that contains an object => change it to our style of js object
  const categoriesMap = querySnapshot.docs.reduce((acc,doc)=>{
    const {title,items} = doc.data();
    //set title to a key 
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
  return categoriesMap;
}