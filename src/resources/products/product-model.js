class ProductsModel {
  constructor(id, name, description, category, price, imageUrl, sizes) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.imageUrl = imageUrl;
    this.sizes = sizes;
    this.ratings = [];
  }

  static getAllProducts() {
    return products;
  }

  static getProductById(id) {
    let products = this.getAllProducts();
    return products.find((product) => product.id === Number(id)) ?? null;
  }

  static addProduct(product) {
    let item = new ProductsModel(
      this.getAllProducts().length + 1,
      product.name,
      product.description,
      product.category,
      product.price,
      product.imageUrl,
      product.sizes
    );
    products.push(item);
    return product;
  }

  static rateProduct(userId, productId, rating) {
    const ratings = {
      userId: userId,
      rating: rating
    }
    const product = this.getProductById(productId);
    const existingRatings = product.ratings;
    const result = existingRatings.find((rateObj) => rateObj.userId == userId);
    if(result) {
      result.rating = rating;
      return product;
    }
    product.ratings.push(ratings);
    return product;
  }

  static getProductsByFilter(minPrice, maxPrice, category) {
    const products = this.getAllProducts();
    const results = products.filter((item) => {
      if (
        item.price >= minPrice &&
        item.price <= maxPrice &&
        item.category === category
      ) {
        return true;
      }
      return false;
    });
    return results;
  }

  static updateProductById(product, id) {
    let productIndex = this.getAllProducts().findIndex(
      (product) => product.id === Number(id)
    );
    if (productIndex == -1) {
      return false;
    }
    let updatedItem = Object.assign({ id: id }, product);
    this.getAllProducts().splice(productIndex, 1, updatedItem);
    let item = this.getAllProducts()[productIndex];
    return item;
  }

  static deleteProductById(id) {
    let productIndex = this.getAllProducts().findIndex(
      (product) => product.id === Number(id)
    );
    if (productIndex == -1) {
      return false;
    }
    let productPopped = this.getAllProducts().splice(productIndex, 1);
    return productPopped;
  }

  static isValidCategory(category) {
    return categories.includes(category);
  }

  static isValidSize(size) {
    return size.every((data) => sizes.includes(data));
  }
}

const categories = ["Footwear", "Clothing", "Electronics", "HomeNeeds"];
const sizes = ["S", "s", "M", "m", "L", "l", "XL", "xl", "XXL", "xxl"];

const products = [
  new ProductsModel(
    1,
    "Mens Sandal",
    "Woodland brings mens sandal",
    "Footwear",
    1900,
    "image-sandal.png",
    ["s", "m", "l", "xl"]
  ),
  new ProductsModel(
    2,
    "Mens Shoe",
    "Woodland brings mens shoe",
    "Footwear",
    2500,
    "image-shoe.png",
    ["s", "m", "l", "xl"]
  ),
  new ProductsModel(
    3,
    "Mens Slippers",
    "Bata brings mens slippers",
    "Footwear",
    3900,
    "image-slippers.png",
    ["s", "m", "l", "xl"]
  ),
  new ProductsModel(
    4,
    "Mens Sneakers",
    "Woodland brings mens sneakers",
    "Footwear",
    2900,
    "image-sneaker.png",
    ["s", "m", "l", "xl"]
  ),
];

export { ProductsModel };
