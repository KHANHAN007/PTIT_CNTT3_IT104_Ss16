import React, { Component } from "react";

type Product = { id: number; name: string; image: string; price: number; stock: number; };
type Props = { product: Product; onAddToCart: (p: Product) => void; };

export default class ProductItem extends Component<Props> {
  render() {
    const { product, onAddToCart } = this.props;
    const disabled = product.stock <= 0;
    return (
      <div style={{
        width: "23%", minWidth: 250, background: "#fff", border: "1px solid #e5e5e5",
        borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 12
      }}>
        <img src={product.image} alt={product.name} style={{ width: 170, height: 170, objectFit: "contain" }} />
        <h4 style={{ textAlign: "center", minHeight: 48 }}>{product.name}</h4>
        <div style={{ fontWeight: 600 }}>{product.price.toLocaleString()} đ</div>
        <div style={{ fontSize: 13, color: "#666" }}>Còn lại: {product.stock}</div>
        <button
          disabled={disabled}
          onClick={() => onAddToCart(product)}
          style={{
            background: disabled ? "#9ca3af" : "#1b63d1",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            cursor: disabled ? "not-allowed" : "pointer",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span>🛒</span> {disabled ? "Hết hàng" : "Thêm vào giỏ hàng"}
        </button>
      </div>
    );
  }
}