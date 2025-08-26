import React, { Component } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ConfirmModal from "./components/ConfirmModal";
import { products as seedProducts } from "./data/product.data";

type Product = { id: number; name: string; image: string; price: number; stock: number; };
type CartRow = Product & { quantity: number; };
type State = {
  products: Product[];
  cart: CartRow[];
  showCart: boolean;
  alert: string;
  pendingRemoveId: number | null;
};
const LS_KEY = "cart_data_v1";

export default class Ex07 extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    const stored = this.loadCart();
    const cloned = seedProducts.map(p => ({ ...p }));
    stored.forEach(ci => {
      const prod = cloned.find(p => p.id === ci.id);
      if (prod) prod.stock = Math.max(0, prod.stock - ci.quantity);
    });
    this.state = {
      products: cloned,
      cart: stored,
      showCart: false,
      alert: "",
      pendingRemoveId: null
    };
  }

  loadCart(): CartRow[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [];
      const parsed: CartRow[] = JSON.parse(raw);
      return parsed.filter(c => seedProducts.some(p => p.id === c.id));
    } catch {
      return [];
    }
  }
  saveCart = (cart: CartRow[]) => localStorage.setItem(LS_KEY, JSON.stringify(cart));
  setAlert(msg: string) {
    this.setState({ alert: msg });
    if (msg) setTimeout(() => this.setState({ alert: "" }), 2500);
  }

  handleAddToCart = (product: Product) => {
    this.setState(prev => {
      const products = prev.products.map(p => ({ ...p }));
      const target = products.find(p => p.id === product.id);
      if (!target || target.stock <= 0) {
        this.setAlert("Sản phẩm đã hết hàng");
        return prev;
      }
      const cart = [...prev.cart];
      const idx = cart.findIndex(c => c.id === product.id);
      if (idx === -1) cart.push({ ...product, quantity: 1 });
      else cart[idx].quantity += 1;
      target.stock -= 1;
      this.saveCart(cart);
      return { ...prev, products, cart };
    });
  };

  inc = (id: number) => {
    this.setState(prev => {
      const products = prev.products.map(p => ({ ...p }));
      const prod = products.find(p => p.id === id);
      if (!prod || prod.stock <= 0) {
        this.setAlert("Số lượng sản phẩm trong kho không đủ");
        return prev;
      }
      const cart = prev.cart.map(c => c.id === id ? { ...c, quantity: c.quantity + 1 } : c);
      prod.stock -= 1;
      this.saveCart(cart);
      return { ...prev, products, cart };
    });
  };

  dec = (id: number) => {
    this.setState(prev => {
      const products = prev.products.map(p => ({ ...p }));
      const cart = prev.cart.map(c => {
        if (c.id === id && c.quantity > 1) {
          const prod = products.find(p => p.id === id);
          if (prod) prod.stock += 1;
          return { ...c, quantity: c.quantity - 1 };
        }
        return c;
      });
      this.saveCart(cart);
      return { ...prev, products, cart };
    });
  };
  askRemove = (id: number) => {
    this.setState({ pendingRemoveId: id });
  };
  confirmRemove = () => {
    this.setState(prev => {
      const id = prev.pendingRemoveId;
      if (id == null) return prev;
      const products = prev.products.map(p => ({ ...p }));
      const removed = prev.cart.find(c => c.id === id);
      if (removed) {
        const prod = products.find(p => p.id === id);
        if (prod) prod.stock += removed.quantity;
      }
      const cart = prev.cart.filter(c => c.id !== id);
      this.saveCart(cart);
      return { ...prev, products, cart, pendingRemoveId: null };
    });
  };

  cancelRemove = () => this.setState({ pendingRemoveId: null });

  toggleCart = () => this.setState(p => ({ showCart: !p.showCart }));

  render() {
    const { products, cart, showCart, alert, pendingRemoveId } = this.state;
    const totalCount = cart.reduce((s, c) => s + c.quantity, 0);
    return (
      <div style={{ fontFamily: "sans-serif" }}>
        <Header cartCount={totalCount} onToggleCart={this.toggleCart} />

        {alert && (
          <div style={{
            position: "fixed", top: 64, left: "50%", transform: "translateX(-50%)",
            background: "#d60000", color: "#fff", padding: "10px 20px",
            borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,.25)", zIndex: 120, fontSize: 14
          }}>
            {alert}
          </div>
        )}

        <ProductList products={products} onAddToCart={this.handleAddToCart} />

        {showCart && (
          <Cart
            cart={cart}
            onInc={this.inc}
            onDec={this.dec}
            onAskRemove={this.askRemove}
            onClose={this.toggleCart}
          />
        )}

        {pendingRemoveId !== null && (
          <ConfirmModal
            message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
            onCancel={this.cancelRemove}
            onConfirm={this.confirmRemove}
          />
        )}
      </div>
    );
  }
}