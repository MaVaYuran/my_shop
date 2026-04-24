import { Cart } from '../model/Cart.js';
import { Product } from '../model/Product.js';

async function getUserCart(id) {
  try {
    const cart = await Cart.findOne({ user: id }).populate('items.product');
    return cart;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart(userId, productId, quantity) {
  try {
    let cart = await findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    const actualPrice = product.price;
    const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, price: actualPrice, quantity });
    }
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateItemQuantity(userId, productId, quantity) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    const item = cart.items.find(item => item.product.toString() === productId.toString());
    if (!item) {
      throw new Error('Product not found in cart');
    }
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString !== productId.toString());
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

async function removeProductFromCart(userId, productId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId.toString());
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}
async function clearUserCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.items = [];
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

export { getUserCart, addProductToCart, updateItemQuantity, removeProductFromCart, clearUserCart };
