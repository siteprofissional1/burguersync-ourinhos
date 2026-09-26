/**
 * ==============================================================================
 * BurguerSync Ourinhos - Configuração do Firebase Firestore (Layer 3)
 * ==============================================================================
 * Conexão com o Firebase Cloud Firestore utilizando o SDK Web v10 oficial via CDN
 * (Módulos ES6). Configurado para suportar carregamento dinâmico e fallback seguro.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configurações do projeto burguersync777
const firebaseConfig = {
  apiKey: "AIzaSyBPbKP80_xE-glAuxcXngmndAdh1ODEdns",
  authDomain: "burguersync777.firebaseapp.com",
  projectId: "burguersync777",
  storageBucket: "burguersync777.firebasestorage.app",
  messagingSenderId: "516138443090",
  appId: "1:516138443090:web:ff0f080f8b32fdcf0dda8b"
};

// Inicialização da instância do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 [BurguerSync] Firebase Firestore inicializado com sucesso para o projeto:", firebaseConfig.projectId);

export { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
};
