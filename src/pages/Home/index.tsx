import { useState, useEffect } from "react";
import { ProductCard } from "../../components/ProductCard";
import { ProductProps } from "../../utils/data/products";
import { Hero } from "./components/Hero";
import { getProduct } from "../../utils/services/productServices ";
import { categoryServices } from "../../utils/services/categoryServices";
import { Catalog, Heading, Items, TagItem, Tags } from "./styles";

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchCatelogy, setSearchCatelogy] = useState("");
  const [categories, setCategoris] = useState([]);
  // Lấy danh sách sản phẩm từ API
  const fetchProducts = () => {
    getProduct({
      page: 1,
      limit: 100,
      id_category: searchCatelogy,
    })
      .then((res: any) => {
        const fetchedProducts = res?.data?.data?.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image, // Cập nhật theo cấu trúc dữ liệu trả về từ API
          tags: item.tags, // Nếu có tags
        }));
        setProducts(fetchedProducts);
      })
      .catch((e: any) => {
        console.error("Lỗi khi lấy sản phẩm:", e);
      });
  };
  const getCategory = () => {
    categoryServices
      .get({
        page: 1,
        size: 100,
      })
      .then((res) => {
        if (res.status) {
          setCategoris(res.data.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // Lấy sản phẩm theo tag
  const handleGetProductsByTag = (tag: any) => {
    setSearchCatelogy(tag);
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchProducts();
    getCategory();
  }, [searchCatelogy]);

  return (
    <main>
      <Hero />

      <Catalog>
        <Heading>
          <h1>Quán cà phê của chúng tôi</h1>

          <Tags>
            {categories.map((categorie: any) => (
              <TagItem
                key={categorie?.id}
                onClick={() => handleGetProductsByTag(categorie?.id)}
                $isActive={searchCatelogy === categorie?.id}
              >
                {categorie?.name}
              </TagItem>
            ))}
          </Tags>
        </Heading>

        <Items>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Items>
      </Catalog>
    </main>
  );
}
