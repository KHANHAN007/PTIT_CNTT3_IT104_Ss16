import React, { Component } from "react";

type Product = { id: number; name: string; image: string; price: number; stock: number; };
type CartRow = Product & { quantity: number; };
type Props = {
  item: CartRow;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onAskRemove: (id: number) => void;
};

export default class CartItem extends Component<Props> {
  render() {
    const { item, onInc, onDec, onAskRemove } = this.props;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0", borderBottom: "1px solid #222" }}>
        <img src={item.image} alt={item.name} style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", background: "#fff" }} />
        <div style={{ flex: 1, fontSize: 14 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={btn} onClick={() => onInc(item.id)}>+</button>
          <span style={{ width: 20, textAlign: "center" }}>{item.quantity}</span>
          <button style={btn} onClick={() => onDec(item.id)} disabled={item.quantity <= 1}>-</button>
        </div>
        <div style={{ width: 110, textAlign: "right", fontSize: 13 }}>
          {(item.price * item.quantity).toLocaleString()} đ
        </div>
        <button
          onClick={() => onAskRemove(item.id)}
          style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
          title="Xóa"
        >
          🗑
        </button>
      </div>
    );
  }
}
const btn: React.CSSProperties = {
  background: "#2e2e2e",
  color: "#fff",
  border: "1px solid #444",
  width: 28,
  height: 28,
  borderRadius: 4,
  cursor: "pointer",
  lineHeight: "26px",
  textAlign: "center",
};