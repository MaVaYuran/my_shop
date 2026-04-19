export function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
    stock: product.stock,
    categoryId: product.categories?._id || product.categories || null,
    categoryTitle: product.categories?.title || null,
  };
}
