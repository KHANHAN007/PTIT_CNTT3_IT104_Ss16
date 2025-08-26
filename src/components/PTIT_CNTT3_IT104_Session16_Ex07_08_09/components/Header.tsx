import React, { Component } from "react";

type Props = {
  cartCount: number;
  onToggleCart: () => void;
};

export default class Header extends Component<Props> {
  render() {
    const { cartCount, onToggleCart } = this.props;
    return (
      <div style={{ background: "#f88936", padding: "8px 16px", display: "flex", alignItems: "center", fontWeight: 500 }}>
        <span style={{ marginRight: 24 }}>Trang chủ</span>
        <span>Danh sách sản phẩm</span>
        <div onClick={onToggleCart} style={{ marginLeft: "auto", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18 }}>🛒</span>
          <span style={{ background: "#d60000", color: "#fff", borderRadius: 12, fontSize: 12, padding: "2px 8px", minWidth: 24, textAlign: "center" }}>
            {cartCount}
          </span>
        </div>
      </div>
    );
  }
}