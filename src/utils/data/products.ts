const PRODUCTS = [
  {
    id: 1,
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    image: '/src/assets/images/products/expresso-tradicional.png',
    tags: ['tradicional'],
    price: 9.9,
  },
  {
    id: 2,
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    image: '/src/assets/images/products/expresso-americano.png',
    tags: ['tradicional'],
    price: 9.9,
  },
  {
    id: 3,
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    image: '/src/assets/images/products/expresso-cremoso.png',
    tags: ['tradicional'],
    price: 9.9,
  },
  {
    id: 4,
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    image: '/src/assets/images/products/expresso-gelado.png',
    tags: ['tradicional', 'gelado'],
    price: 9.9,
  },
  {
    id: 5,
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    image: '/src/assets/images/products/cafe-com-leite.png',
    tags: ['tradicional', 'com leite'],
    price: 10.5,
  },
  {
    id: 6,
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    image: '/src/assets/images/products/latte.png',
    tags: ['tradicional', 'com leite'],
    price: 10.5,
  },
  {
    id: 7,
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    image: '/src/assets/images/products/capuccino.png',
    tags: ['tradicional', 'com leite'],
    price: 10.5,
  },
  {
    id: 8,
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    image: '/src/assets/images/products/macchiato.png',
    tags: ['tradicional', 'com leite'],
    price: 10.5,
  },
  {
    id: 9,
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    image: '/src/assets/images/products/mocaccino.png',
    tags: ['tradicional', 'com leite'],
    price: 10.5,
  },
  {
    id: 10,
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    image: '/src/assets/images/products/chocolate-quente.png',
    tags: ['especial', 'com leite'],
    price: 12.0,
  },
  {
    id: 11,
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    image: '/src/assets/images/products/cubano.png',
    tags: ['especial', 'alcoólico', 'gelado'],
    price: 12.0,
  },
  {
    id: 12,
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    image: '/src/assets/images/products/havaiano.png',
    tags: ['especial'],
    price: 12.0,
  },
  {
    id: 13,
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    image: '/src/assets/images/products/arabe.png',
    tags: ['especial'],
    price: 12.0,
  },
  {
    id: 14,
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    image: '/src/assets/images/products/irlandes.png',
    tags: ['especial', 'alcoólico'],
    price: 12.0,
  },
]

const TAGS = ['tradicional', 'especial', 'com leite', 'alcoólico', 'gelado']

const productsByTag = (tag: string) => PRODUCTS.filter((product) => product.tags.includes(tag))

export type ProductProps = (typeof PRODUCTS)[0]

export { PRODUCTS, TAGS, productsByTag }
