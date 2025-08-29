const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Routes

// Get all medicines
app.get('/medicines', async (req, res) => {
  const meds = [];
  const querySnapshot = await getDocs(collection(db, "medicines"));
  querySnapshot.forEach(doc => meds.push({ id: doc.id, ...doc.data() }));
  res.json(meds);
});

// Add new medicine
app.post('/medicines', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "medicines"), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Backend running at http://localhost:${port}`));
