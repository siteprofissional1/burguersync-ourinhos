/**
 * ==============================================================================
 * BurguerSync Ourinhos - Teste Determinístico de Conexão com Firestore (Layer 3)
 * ==============================================================================
 * Valida as credenciais do .env e a conectividade com o Firebase Firestore.
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, limit, query, deleteDoc, doc, serverTimestamp } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Carrega .env manualmente
function carregarEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const conteudo = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  conteudo.split('\n').forEach(linha => {
    const limpa = linha.trim();
    if (limpa && !limpa.startsWith('#')) {
      const idx = limpa.indexOf('=');
      if (idx !== -1) {
        const chave = limpa.substring(0, idx).trim();
        let valor = limpa.substring(idx + 1).trim();
        // Remove aspas ou vírgulas residuais
        valor = valor.replace(/^["']/, '').replace(/["'],?$/, '');
        env[chave] = valor;
      }
    }
  });
  return env;
}

async function testarConexao() {
  console.log('--- TESTANDO CONEXÃO COM O FIREBASE CLOUD FIRESTORE ---');
  const env = carregarEnv();

  const firebaseConfig = {
    apiKey: env.FIREBASE_apiKey,
    authDomain: env.FIREBASE_authDomain,
    projectId: env.FIREBASE_projectId,
    storageBucket: env.FIREBASE_storageBucket,
    messagingSenderId: env.FIREBASE_messagingSenderId,
    appId: env.FIREBASE_appId
  };

  console.log(`Projeto ID: ${firebaseConfig.projectId}`);
  console.log(`Auth Domain: ${firebaseConfig.authDomain}`);

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // 1. Gravar documento de teste
    console.log('Tentando gravar documento de teste em "pedidos"...');
    const docRef = await addDoc(collection(db, 'pedidos'), {
      testeConexao: true,
      cliente: { nome: "Teste Autônomo Antigravity", celular: "(14) 99999-0000" },
      valores: { total: 5.00 },
      status: "Recebido",
      horario: serverTimestamp()
    });
    console.log(`✅ Documento de teste gravado com sucesso! ID: ${docRef.id}`);

    // 2. Ler documentos da coleção pedidos
    console.log('Tentando ler coleção "pedidos"...');
    const q = query(collection(db, 'pedidos'), limit(3));
    const snapshot = await getDocs(q);
    console.log(`✅ Coleção lida com sucesso! Total de documentos retornados: ${snapshot.size}`);

    // 3. Limpeza do documento de teste
    await deleteDoc(doc(db, 'pedidos', docRef.id));
    console.log(`✅ Documento temporário de teste (${docRef.id}) removido após validação.`);

    console.log('\n🎉 Conexão e regras do Firestore validadas com 100% de sucesso!');
  } catch (error) {
    console.error('❌ Erro na conexão com o Firestore:', error);
    process.exit(1);
  }
}

testarConexao();
