import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC14uOof2Sp8hWoMqZYZ0qeKs3lckrl6iU",
  authDomain: "fir-contactform-57802.firebaseapp.com",
  projectId: "fir-contactform-57802",
  storageBucket: "fir-contactform-57802.appspot.com",
  messagingSenderId: "1003851739885",
  appId: "1:1003851739885:web:7f66b986f18200666492e4"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'clients')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let clients = []
    snapshot.docs.forEach(doc => {
      clients.push({ ...doc.data(), id: doc.id })
    })
    console.log(clients)
  })
  .catch(err => {
    console.log(err.message)
  })

  // adding docs
const addClient = document.querySelector('.contactForm')
addClient.addEventListener('submit', (e) => {
  e.preventDefault()

  //const docRef = doc(db, 'clients', 'client-1')

  addDoc(colRef, {
    name: addClient.name.value,
    email: addClient.email.value,
    phone: addClient.phone.value,
  })
  .then(() => {
    addClient.reset()
  })
})

// deleting docs
const deleteClient = document.querySelector('.delete')
deleteClient.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'clients', deleteClient.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteClient.reset()
    })
})







/* // Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
} */