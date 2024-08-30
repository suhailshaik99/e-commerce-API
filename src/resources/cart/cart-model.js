export default class CartModel {
  constructor(cartId, productId, userId, qty) {
    this.cartId = cartId;
    this.productId = productId;
    this.userId = userId;
    this.qty = qty;
  }

  static getAllItems() {
    return cartItems;
  }

  static addProductToCart(userId, productId, qty) {
    const item = new CartModel(
      this.getAllItems().length + 1,
      productId,
      userId,
      qty
    );
    cartItems.push(item);
  }

  static getItemsByUserId(userId) {
    return (
      this.getAllItems().filter((item) => item.userId === Number(userId)) ??
      null
    );
  }

  static deleteCartItems(userId, productId) {
    const products = this.getAllItems().filter(
      (items) =>
        items.productId === Number(productId) && items.userId === Number(userId)
    );
    if (products.length == 0) {
      return false;
    }
    console.log(products);
    const indices = [];
    products.forEach((items) => {
      indices.push(
        this.getAllItems().findIndex(
          (item) =>
            item.productId === items.productId && item.userId === items.userId
        )
      );
    });
    console.log(indices);
    indices.forEach((index) => {
      this.getAllItems().splice(index, 1);
    });
    return true;
  }
}

const cartItems = [new CartModel(1, 1, 1, 5)];
