/**
 * ==============================================================================
 * BurguerSync Ourinhos - Criação e Publicação no Repositório Público (Layer 3)
 * ==============================================================================
 * Cria o repositório público no GitHub via REST API e realiza o push com GitHub Pages.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function carregarToken() {
  const envPath = path.join(__dirname, '..', '.env');
  const conteudo = fs.readFileSync(envPath, 'utf-8');
  for (const linha of conteudo.split('\n')) {
    const limpa = linha.trim();
    if (limpa.startsWith('GITHUB_PERSONAL_KEY=')) {
      return limpa.split('=')[1].trim();
    }
  }
  throw new Error("Chave GITHUB_PERSONAL_KEY não encontrada no arquivo .env");
}

async function publicarRepositorio() {
  console.log("🚀 [GITHUB API] Iniciando rotina de publicação em novo repositório público...");
  const token = carregarToken();
  const repoName = "burguersync-ourinhos";
  const user = "siteprofissional1";

  // 1. Verifica se repositório já existe ou precisa ser criado
  console.log(`🔍 Verificando se o repositório '${repoName}' já existe em '${user}'...`);
  
  const checkRes = await fetch(`https://api.github.com/repos/${user}/${repoName}`, {
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Antigravity-Agent"
    }
  });

  if (checkRes.status === 404) {
    console.log(`📦 Criando novo repositório PÚBLICO: ${repoName}...`);
    const createRes = await fetch(`https://api.github.com/user/repos`, {
      method: "POST",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Antigravity-Agent"
      },
      body: JSON.stringify({
        name: repoName,
        description: "🍔 BurguerSync Ourinhos - Sistema integrado de delivery e painel de cozinha em tempo real com Google Antigravity, Google Stitch e Firebase Cloud Firestore.",
        private: false,
        homepage: `https://${user}.github.io/${repoName}/`
      })
    });

    if (!createRes.ok) {
      const errJson = await createRes.json();
      throw new Error(`Erro ao criar repositório no GitHub: ${JSON.stringify(errJson)}`);
    }
    console.log(`✅ Repositório público '${repoName}' criado com sucesso!`);
  } else if (checkRes.ok) {
    console.log(`ℹ️ Repositório '${repoName}' já existe. Prosseguindo com sincronização...`);
  }

  // 2. Prepara e publica o repositório Git local
  const projectDir = path.join(__dirname, '..');
  console.log(`📂 Inicializando repositório Git em: ${projectDir}`);

  // Comandos de Git
  const gitRemoteUrl = `https://${token}@github.com/${user}/${repoName}.git`;

  try {
    // Inicializa git se não for um repo isolado
    execSync(`git init -b main`, { cwd: projectDir, stdio: 'inherit' });
    execSync(`git config user.name "Victor Cesar"`, { cwd: projectDir, stdio: 'inherit' });
    execSync(`git config user.email "victorcesar@siteprofissional.pro"`, { cwd: projectDir, stdio: 'inherit' });
    
    // Configura o remote específico do projeto
    try {
      execSync(`git remote remove burguersync-public`, { cwd: projectDir, stdio: 'ignore' });
    } catch (_) {}
    
    execSync(`git remote add burguersync-public ${gitRemoteUrl}`, { cwd: projectDir, stdio: 'inherit' });

    // Adiciona arquivos
    console.log("📝 Adicionando arquivos para o commit...");
    execSync(`git add -A`, { cwd: projectDir, stdio: 'inherit' });
    
    // Commit
    try {
      execSync(`git commit -m "feat: lancamento oficial do BurguerSync Ourinhos com Antigravity, Stitch e Firebase"`, { cwd: projectDir, stdio: 'inherit' });
    } catch (e) {
      console.log("ℹ️ Nenhum novo arquivo para commitar ou já commitado.");
    }

    // Push para a branch main
    console.log("⬆️ Enviando commits para o GitHub público (branch main)...");
    execSync(`git push -u burguersync-public main --force`, { cwd: projectDir, stdio: 'inherit' });
    console.log("✅ Push realizado com sucesso!");

  } catch (err) {
    console.error("❌ Erro durante operações do Git:", err.message);
    throw err;
  }

  // 3. Tenta ativar o GitHub Pages
  console.log("🌐 Configurando GitHub Pages para publicação contínua...");
  try {
    const pagesRes = await fetch(`https://api.github.com/repos/${user}/${repoName}/pages`, {
      method: "POST",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Antigravity-Agent"
      },
      body: JSON.stringify({
        source: {
          branch: "main",
          path: "/"
        }
      })
    });

    if (pagesRes.ok || pagesRes.status === 409) {
      console.log(`✅ GitHub Pages ativo com sucesso! URL: https://${user}.github.io/${repoName}/`);
    } else {
      const pErr = await pagesRes.json();
      console.log(`ℹ️ Resposta da ativação do Pages:`, pErr.message);
    }
  } catch (pErr) {
    console.warn("⚠️ Aviso ao configurar GitHub Pages:", pErr.message);
  }

  console.log(`\n🎉 PROJETO PUBLICADO COM SUCESSO!`);
  console.log(`🔗 Repositório Público: https://github.com/${user}/${repoName}`);
  console.log(`🌐 Live URL (GitHub Pages): https://${user}.github.io/${repoName}/`);
}

publicarRepositorio()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ Falha crítica na publicação:", err);
    process.exit(1);
  });
