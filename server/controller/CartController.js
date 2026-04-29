import {
  getUserCart,
  addProductToCart,
  updateItemQuantity,
  removeProductFromCart,
  clearUserCart,
} from '../service/CartService.js';

async function getCart(req, res) {
  try {
    const cart = await getUserCart(req.user._id);
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const cart = await addProductToCart(req.user._id, productId, quantity);
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function updateCartItem(req, res) {
  try {
    const { productId, quantity } = req.body;
    console.log('reqbody', req.body);

    const cart = await updateItemQuantity(req.user._id, productId, quantity);
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function removeFromCart(req, res) {
  try {
    const cart = await removeProductFromCart(req.user._id, req.params.productId);
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function clearCart(req, res) {
  try {
    const cart = await clearUserCart(req.user._id);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
