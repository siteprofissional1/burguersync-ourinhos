/**
 * ==============================================================================
 * BurguerSync Ourinhos - Catálogo Oficial de Produtos (Layer 3)
 * ==============================================================================
 * 10 Hambúrgueres artesanais gourmet + 5 Bebidas selecionadas + Porções especiais.
 * Fotos culinárias profissionais em alta definição com estética Dark Mode.
 */

export const CATEGORIAS = [
  { id: "todos", nome: "🔥 Todos os Itens" },
  { id: "burgers", nome: "🍔 Hambúrgueres Artesanais" },
  { id: "bebidas", nome: "🥤 Bebidas Geladas" },
  { id: "porcoes", nome: "🍟 Acompanhamentos" }
];

export const PRODUTOS = [
  // ==========================================
  // 🍔 10 HAMBÚRGUERES ARTESANAIS
  // ==========================================
  {
    id: "b1",
    categoria: "burgers",
    nome: "Ourinhos Smash Burguer",
    descricao: "Pão brioche tostado na manteiga da terra, 2x smash burger artesanal de 80g, queijo cheddar cremoso e bacon crocante.",
    preco: 28.00,
    imagem: "assets/imagens/ourinhos-smash.jpg",
    destaque: "Mais Vendido"
  },
  {
    id: "b2",
    categoria: "burgers",
    nome: "Monster Bacon SENAI",
    descricao: "Pão australiano macio, 200g de blend bovino no ponto, fatias fartas de bacon caramelizado no melado, anéis de cebola crocantes e barbecue rústico.",
    preco: 34.00,
    imagem: "assets/imagens/monster-bacon.jpg",
    destaque: "Favorito do Chef"
  },
  {
    id: "b3",
    categoria: "burgers",
    nome: "Duplo Cheddar Melt",
    descricao: "Pão brioche selado, dois blends suculentos de 110g, verdadeira cascata de cheddar inglês derretido e cebola grelhada no shoyu.",
    preco: 32.00,
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    destaque: "Especial"
  },
  {
    id: "b4",
    categoria: "burgers",
    nome: "Smokehouse BBQ Artesanal",
    descricao: "Blend de 180g defumado com lenha de macieira, queijo prato tostado, tiras crocantes de bacon caipira e molho barbecue artesanal picante.",
    preco: 36.00,
    imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    destaque: "Defumado"
  },
  {
    id: "b5",
    categoria: "burgers",
    nome: "Trufado Gorgonzola Burger",
    descricao: "Blend nobre de costela angus 180g, fondue cremoso de gorgonzola com toque suave de azeite trufado, rúcula fresca e geleia de pimenta.",
    preco: 39.00,
    imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    destaque: "Linha Gourmet"
  },
  {
    id: "b6",
    categoria: "burgers",
    nome: "Crispy Chicken Supreme",
    descricao: "Sobrecoxa de frango marinada em ervas e empanada em farinha panko ultracrocante, queijo mozarela derretido, maionese verde e picles doce.",
    preco: 27.00,
    imagem: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    destaque: "Crocante"
  },
  {
    id: "b7",
    categoria: "burgers",
    nome: "Costela Desfiada 8 Horas",
    descricao: "Blend bovino 160g coberto com generosa porção de costela bovina desfiada marinada por 8 horas, provolone derretido e maionese defumada.",
    preco: 38.00,
    imagem: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    destaque: "Receita Secreta"
  },
  {
    id: "b8",
    categoria: "burgers",
    nome: "Jalapeño Fire Smash",
    descricao: "Dois smash burgers de 80g na chapa bem tostada, queijo monterey jack, picles de pimenta jalapeño artesanal e maionese sriracha da casa.",
    preco: 31.00,
    imagem: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
    destaque: "Picante"
  },
  {
    id: "b9",
    categoria: "burgers",
    nome: "Veggie Cogumelos Salteados",
    descricao: "Hambúrguer artesanal de grão-de-bico com especiarias, mix de cogumelos shimeji e paris salteados na manteiga, queijo vegano e brotos frescos.",
    preco: 33.00,
    imagem: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    destaque: "Vegetariano"
  },
  {
    id: "b10",
    categoria: "burgers",
    nome: "Triplo Smash Vulcão",
    descricao: "O gigante da casa: 3 smash burgers de 80g prensados na crostinha, triplo queijo cheddar, farofa crocante de bacon artesanal e molho burguer sync.",
    preco: 42.00,
    imagem: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    destaque: "Gigante da Casa"
  },

  // ==========================================
  // 🥤 5 BEBIDAS GELADAS
  // ==========================================
  {
    id: "d1",
    categoria: "bebidas",
    nome: "Coca-Cola Original Lata 350ml",
    descricao: "Refrigerante Coca-Cola em lata 350ml trincando de gelada.",
    preco: 6.00,
    imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    destaque: "Gelada"
  },
  {
    id: "d2",
    categoria: "bebidas",
    nome: "Coca-Cola Sem Açúcar 350ml",
    descricao: "Coca-Cola Zero calorias em lata 350ml extremamente refrescante.",
    preco: 6.00,
    imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
    destaque: "Zero Açúcar"
  },
  {
    id: "d3",
    categoria: "bebidas",
    nome: "Guaraná Antarctica Lata 350ml",
    descricao: "O autêntico refrigerante brasileiro com extrato de guaraná da Amazônia geladíssimo.",
    preco: 6.00,
    imagem: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    destaque: "Nacional"
  },
  {
    id: "d4",
    categoria: "bebidas",
    nome: "Suco Natural de Laranja 500ml",
    descricao: "Suco 100% natural espremido na hora com laranjas frescas selecionadas do interior paulista.",
    preco: 10.00,
    imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    destaque: "100% Natural"
  },
  {
    id: "d5",
    categoria: "bebidas",
    nome: "Cerveja Artesanal IPA Ourinhos 500ml",
    descricao: "Cerveja artesanal estilo American IPA produzida localmente, amargor marcante e notas cítricas.",
    preco: 18.00,
    imagem: "https://images.unsplash.com/photo-1608270104996-5f3366c3a1c6?auto=format&fit=crop&w=800&q=80",
    destaque: "Artesanal Local"
  },

  // ==========================================
  // 🍟 ACOMPANHAMENTOS
  // ==========================================
  {
    id: "p1",
    categoria: "porcoes",
    nome: "Batata Rústica Suprema",
    descricao: "Batatas cortadas em gomos crocantes por fora e macias por dentro, cobertas com fondue de cheddar e farofa de bacon artesanal.",
    preco: 18.00,
    imagem: "assets/imagens/batata-suprema.jpg",
    destaque: "Para Compartilhar"
  }
];
