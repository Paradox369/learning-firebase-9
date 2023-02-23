import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUwIZ5rj2z9_ErYQdyjZ2ltTVALAdc3tw",
  authDomain: "paradox-learns-firebase-9.firebaseapp.com",
  projectId: "paradox-learns-firebase-9",
  storageBucket: "paradox-learns-firebase-9.appspot.com",
  messagingSenderId: "210108796849",
  appId: "1:210108796849:web:d7a302fd43afb78828b790",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));

// get collection data in real time
onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});

// add docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => addBookForm.reset());
});

// delete docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => deleteBookForm.reset());
});

// get single doc
const docRef = doc(db, "books", "AQ0dto5VNyxmFsbZl0N0");
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// update docs
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateBookForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => updateBookForm.reset());
});

// signing up users
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log("user created:", credentials.user);
      signupForm.reset();
    })
    .catch((err) => console.log(err.message));
});
