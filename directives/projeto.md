# 📘 SOP Mestre: BurguerSync Ourinhos

**Status:** Planejamento / Inicialização | **Versão:** 2.5.5

---

## 1. Visão Geral e Objetivo Principal

O **BurguerSync Ourinhos** é uma aplicação web full-stack em tempo real para gerenciamento unificado de pedidos delivery e controle operacional de comandas de cozinha. O sistema elimina o atrito de comunicação entre clientes e chapeiros em hamburguerias artesanais, resolvendo a perda de comandas físicas e a lentidão no atendimento por meio de sincronização instantânea de dados via Firebase Cloud Firestore. A solução oferece ao cliente uma experiência de compra ágil inspirada nos principais aplicativos de delivery e disponibiliza à equipe da cozinha um painel kanban interativo em tempo real para controle do ciclo de preparo e despacho.

---

## 2. Arquitetura do Projeto (Antigravity v2.5.5)

* **Layer 1 (Diretiva & Estratégia - Lógica de Negócio):** Documentos mestres armazenados na pasta `directives/` (`directives/projeto.md`, `directives/ideia-projeto.md` e `directives/design/design.md`). Esta camada define o comportamento do negócio, regras de transição de status dos lanches, modelo dos dados, catálogo de produtos, cálculo de entrega fixa e contratos de validação cadastral. Nenhuma instrução desta camada executa cálculos determinísticos diretamente; ela atua como o manual normativo do sistema.


* **Layer 2 (Orquestração / Gemini 3.8 Flash):** Camada de inteligência intermediária que interpreta os requisitos da Layer 1, supervisiona a criação e coerência dos módulos, valida os estados transitórios armazenados no diretório temporário `.tmp/` e coordena a geração determinística dos artefatos da Layer 3.


* **Layer 3 (Execução & Determinismo - Código e Ferramentas):** Código executável semântico e determinístico, composto por arquivos HTML5 puros, estilização CSS3 moderna com Dark Mode e scripts JavaScript Vanilla (módulos ES6) que se conectam via CDN ao SDK v10 do Firebase. Inclui rotinas de validação de formulário, listeners reativos de eventos, suítes de teste de integração e scripts em lote para automação local e build.



---

## 3. Escopo Tecnológico & Requisitos (Tech Stack)

### Frontend e Interface de Usuário

* Estrutura semântica baseada em HTML5 puro, modularizada por seções reativas sem a utilização de frameworks pesados.


* Folha de estilos em CSS3 moderno utilizando variáveis nativas (CSS Custom Properties), layout responsivo (Flexbox e CSS Grid), microinterações nos botões de adicionar e badges iluminadas com efeito neon.


* Lógica dinâmica do lado do cliente estruturada em JavaScript puro (Vanilla ES6+), utilizando a Fetch API e módulos nativos via CDN.



### Backend e Persistência em Nuvem

* Banco de dados NoSQL serverless Google Firebase Cloud Firestore (SDK Web v10 via CDN) para persistência e propagação reativa de eventos.


* Coleção principal no Firestore denominada `pedidos`, armazenando o ciclo completo da transação.


* Estrutura do documento persistido no Firestore:


* `cliente`: objeto contendo `{ nome: string, email: string, celular: string, endereco: string, obsEntrega: string }`.


* `itens`: array de objetos `{ nome: string, preco: number, quantidade: number, obsItem: string }`.


* `pagamento`: objeto contendo `{ metodo: ("Pix" | "Cartao_Entrega" | "Dinheiro_Entrega"), troco: string }`.


* `valores`: objeto contendo `{ subtotal: number, taxaEntrega: 5.00, total: number }`.


* `status`: string restrita ao ciclo `("Recebido" | "Em Preparo" | "Saiu para Entrega" | "Entregue")`.


* `horario`: timestamp oficial do servidor gerado por `serverTimestamp()`.





### Hospedagem e Ambientes

* Entregáveis de frontend hospedados na nuvem via GitHub Pages com pipeline de deploy contínuo.


* Arquivos intermediários de teste, buffers de validação de schema e payloads transitórios armazenados estritamente na pasta local `.tmp/`.


* Variáveis de ambiente configuradas no arquivo `.env` para consumo dinâmico (chaves de acesso, App ID e Project ID do Firebase) sem exposição estática de dados sensíveis no repositório.



---

## 4. Diretrizes de UX/UI e Referências Visuais

* **Inspiração Real:** Interface moderna de delivery rápido estilo iFood, associada a painéis kanban de despacho industrial para cozinhas.


* **Design System em Dark Mode:**
* Superfície de fundo (Canvas): `#0A0A0C` e `#121214` para contraste confortável e economia de energia de tela.


* Cartões de lanche e pedidos: Grafite escuro `#202024` com bordas sutis em `#323238`.


* Ações de marca e CTAs primários: Laranja Neon `#FF9000` com sombras difusas para apetite visual e conversão.


* Alertas e observações críticas: Amarelo Neon `#FFB800` para instruções de preparo (ex: lanches sem cebola).


* Conclusão de checkout e pedidos entregues: Verde Neon `#04D361` de alto contraste.




* **Tipografia e Hierarquia:** Família `'Poppins'` aplicada a títulos e valores numéricos para impacto visual; família `'Inter'` para campos de formulário, descrições de ingredientes e rótulos.


* **Layout Adaptativo (Mobile-First):**
* Visualização do Cliente: Fluxo vertical em coluna única para smartphones, com gaveta de carrinho expansível e fixação de resumo financeiro; no desktop, vitrine em grade de produtos com sidebar lateral fixa.


* Visualização da Cozinha: Grid responsivo de cartões de pedidos com botões de avanço de status ergonômicos e legibilidade ampliada para visualização a distância no ambiente da chapa.





---

## 5. Fluxo Operacional de Execução

### Passo 1: Inicialização e Verificação de Diretivas

* A Layer 2 (Orquestrador) lê os requisitos de negócio em `directives/ideia-projeto.md` e o manual visual em `directives/design/design.md`.


* Criação obrigatória das pastas de isolamento: `.tmp/` (para trânsito de dados de debug e logs locais), `directives/` (para as especificações de negócio) e `src/` (para os módulos executáveis).


* Configuração do arquivo `.env` com as chaves do Firebase Firestore.



### Passo 2: Isolamento Transitório e Validação de Schema (Layer 3)

* Simulação de payloads de teste de pedidos armazenados em `.tmp/raw_order_schema.json` para testar os limites de tipagem e integridade do Firestore antes da integração final com a interface.


* Execução de testes determinísticos de sanitização dos dados dos clientes (validação de número de celular no DDD 14 e conferência de taxa de entrega fixa de R$ 5,00).



### Passo 3: Construção da Interface Semântica (Layer 3 via Layer 1)

* Criação dos arquivos estruturais `index.html` e `style.css` aplicando os seletores de classe e identificadores de elemento definidos na especificação de design (`#vitrineLanches`, `#carrinho`, `#formEntrega`, `#listaPedidos`).


* Implementação dos botões de alternância de visualização (`#btnModoCliente` e `#btnModoCozinha`) para gerenciar as seções da interface sem recarregamento de página.



### Passo 4: Integração Reativa da Visão do Cliente

* Criação do módulo de carrinho: controle dinâmico de quantidades, cálculo acumulado de subtotal e inserção de observações específicas por item do pedido.


* Gatilho de submissão do formulário: validação dos campos obrigatórios (nome completo, WhatsApp com DDD, endereço completo e carrinho não vazio).


* Disparo da gravação na nuvem via método `addDoc` na coleção `pedidos`, reset do estado do formulário/carrinho e exibição de alerta de confirmação com dados para pagamento (QR Code e chave Pix Copia e Cola).



### Passo 5: Integração Reativa da Visão da Cozinha

* Implementação do listener em tempo real utilizando a função `onSnapshot` do Firestore com consulta filtrada e ordenada por horário descendente (`orderBy("horario", "desc")`).


* Renderização instantânea dos novos pedidos na fila de trabalho sem necessidade de intervenção do usuário ou recarregamento manual (F5).


* Vinculação dos gatilhos nos botões de avanço de estágio, disparando o método `updateDoc` para modificar a propriedade `status` no Firestore e atualizar as cores das badges operacionais.



### Passo 6: Publicação em Nuvem e Deploy

* Envio do código-fonte para o repositório remoto Git e ativação da publicação no GitHub Pages.


* Registro do status de entrega e arquivamento dos arquivos de depuração da pasta `.tmp/`.



---

## 6. Definição de Sucesso (Deliverables)

### Entregáveis em Nuvem

* Aplicação web hospedada e acessível via GitHub Pages, plenamente integrada ao cluster de banco de dados do Firebase Cloud Firestore.


* Painel de monitoramento do Firestore exibindo as gravações concorrentes de pedidos e alterações de status sem falhas de permissão de segurança.



### Entregáveis de Código Local

* `index.html`: Arquitetura semântica HTML5 integrando a visão do cliente e o monitor da cozinha.


* `style.css`: Folha de estilo em Dark Mode com animações hover e badges luminosas.


* `src/firebase-config.js`: Módulo determinístico de conexão ao Firebase Firestore.


* `src/cliente.js`: Lógica de validação cadastral, carrinho dinâmico e submissão via `addDoc`.


* `src/cozinha.js`: Escutador em tempo real com `onSnapshot` e atualização via `updateDoc`.



### Arquivos de Suporte Obrigatórios

* `README.md`: Documentação técnica bilíngue do projeto com instruções de configuração.


* `instruction.md`: Guia resumido de comandos de terminal para testes e deploy.


* `executar.bat`: Script em lote para inicialização local e sincronização rápida em ambiente Windows.


* Pasta `.tmp/`: Diretório temporário livre de arquivos residuais ao término das execuções em regime estável.



---

## 7. Tratamento de Erros, Resiliência e Self-Annealing

### Falhas de Conectividade com o Firestore (Modo Offline e Queda de Rede)

* Se houver oscilação de conexão ou instabilidade na API do Firebase durante a tentativa de envio do pedido pelo cliente, o erro deve ser capturado no bloco `catch`.


* O payload do pedido rejeitado deve ser persistido imediatamente no `localStorage` do navegador e no arquivo temporário `.tmp/failed_order_backup.json`.


* O script acionará retentativas automáticas com recuo exponencial (backoff de 1s, 2s, 4s até 3 tentativas) antes de exibir um alerta informativo ao cliente com opção de reenvio manual.



### Resiliência do Listener em Tempo Real da Cozinha

* Em situações de perda do canal WebSocket do Firestore no painel da cozinha, o listener `onSnapshot` deve tratar a mensagem de erro emitida pelo SDK e tentar reestabelecer o canal automaticamente a cada 5 segundos.


* Durante a reconexão, a interface exibe visualmente um alerta indicando modo de recuperação de sinal, registrando a ocorrência no log transitório `.tmp/firebase_connection.log`.



### Sanitização Estrita de Entrada e Impedimento de Payloads Corrompidos

* Se o cliente tentar enviar o pedido com itens corrompidos, campos vazios ou formatos de telefone inconsistentes, a Layer 3 intercepta a submissão no cliente antes de efetuar o consumo da cota do banco em nuvem.


* As falhas de validação de formulário são apresentadas com bordas de realce em Amarelo Neon e foco automático no primeiro campo pendente de preenchimento.



### Ciclo de Auto-Aperfeiçoamento Documental (Self-Annealing)

* Caso surjam exceções não previstas em produção (como bloqueios de Cross-Origin, restrições nas regras de segurança do Firestore ou divergências no fuso horário das comandas), o orquestrador (Layer 2) isola a mensagem de erro fornecida pelo console.


* A correção é aplicada de forma determinística na Layer 3 e, em seguida, as diretrizes em `directives/projeto.md` e `directives/ideia-projeto.md` são atualizadas para registrar a nova restrição de negócio, tornando o sistema imune à recorrência do problema.