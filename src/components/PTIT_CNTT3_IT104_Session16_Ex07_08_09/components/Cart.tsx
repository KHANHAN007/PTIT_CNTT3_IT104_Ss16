import React, { Component } from "react";
import CartItem from "./CartItem";

type Product = { id: number; name: string; image: string; price: number; stock: number; };
type CartRow = Product & { quantity: number; };
type Props = {
  cart: CartRow[];
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onAskRemove: (id: number) => void;
  onClose: () => void;
};

export default class Cart extends Component<Props> {
  render() {
    const { cart, onInc, onDec, onAskRemove, onClose } = this.props;
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    return (
      <div style={{
        position: "fixed", top: 54, right: 24, width: 430, background: "#000",
        color: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,.35)",
        zIndex: 100, maxHeight: "80vh", overflowY: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Cart</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ marginTop: 12 }}>
          {cart.length === 0 && <div>Giỏ hàng trống</div>}
          {cart.map(c => (
            <CartItem key={c.id} item={c} onInc={onInc} onDec={onDec} onAskRemove={onAskRemove} />
          ))}
        </div>
        <hr style={{ borderColor: "#222", margin: "18px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()} đ</span>
        </div>
      </div>
    );
  }
}