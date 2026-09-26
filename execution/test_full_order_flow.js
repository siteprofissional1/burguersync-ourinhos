/**
 * ==============================================================================
 * BurguerSync Ourinhos - Teste de Fluxo Completo de Pedido e Cozinha (Layer 3)
 * ==============================================================================
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDoc, updateDoc, doc, deleteDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBPbKP80_xE-glAuxcXngmndAdh1ODEdns",
  authDomain: "burguersync777.firebaseapp.com",
  projectId: "burguersync777",
  storageBucket: "burguersync777.firebasestorage.app",
  messagingSenderId: "516138443090",
  appId: "1:516138443090:web:ff0f080f8b32fdcf0dda8b"
};

async function testarFluxoCompleto() {
  console.log("🍔 [TESTE END-TO-END] Iniciando fluxo completo de pedido...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const novoPedido = {
    cliente: {
      nome: "Victor César SENAI",
      email: "victor.cesar@senai.br",
      celular: "(14) 99895-1657",
      endereco: "Rua Vitório Christoni, 1500 - Vila São Luiz, Ourinhos-SP",
      obsEntrega: "Portaria principal do SENAI"
    },
    itens: [
      {
        nome: "Ourinhos Smash Burguer",
        preco: 28.00,
        quantidade: 1,
        obsItem: "Sem cebola, queijo bem derretido"
      }
    ],
    pagamento: {
      metodo: "Pix",
      troco: ""
    },
    valores: {
      subtotal: 28.00,
      taxaEntrega: 5.00,
      total: 33.00
    },
    status: "Recebido",
    horario: serverTimestamp()
  };

  // 1. Simulação: Cliente clica em 'Finalizar Pedido'
  console.log("1️⃣ [CLIENTE] Enviando pedido via addDoc...");
  const docRef = await addDoc(collection(db, "pedidos"), novoPedido);
  console.log(`✅ Pedido cadastrado com sucesso! ID: ${docRef.id}`);

  // 2. Simulação: Cozinha recebe o pedido e avança para 'Em Preparo'
  console.log("2️⃣ [COZINHA] Cozinha avança status para 'Em Preparo' via updateDoc...");
  await updateDoc(doc(db, "pedidos", docRef.id), { status: "Em Preparo" });
  
  // 3. Verifica o estado persistido no Firestore
  const pedidoSnap = await getDoc(doc(db, "pedidos", docRef.id));
  const dados = pedidoSnap.data();
  console.log(`✅ Status verificado no Firestore: ${dados.status}`);

  if (dados.status !== "Em Preparo") {
    throw new Error(`Status esperado 'Em Preparo', recebido: ${dados.status}`);
  }

  // 4. Cozinha avança para 'Saiu para Entrega' e depois 'Entregue'
  console.log("3️⃣ [COZINHA] Avançando para 'Saiu para Entrega'...");
  await updateDoc(doc(db, "pedidos", docRef.id), { status: "Saiu para Entrega" });
  
  console.log("4️⃣ [COZINHA] Avançando para 'Entregue'...");
  await updateDoc(doc(db, "pedidos", docRef.id), { status: "Entregue" });

  console.log(`\n🎉 FLUXO END-TO-END VALIDADO COM 100% DE SUCESSO! ID: ${docRef.id}`);
}

testarFluxoCompleto()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ Falha no teste end-to-end:", err);
    process.exit(1);
  });
