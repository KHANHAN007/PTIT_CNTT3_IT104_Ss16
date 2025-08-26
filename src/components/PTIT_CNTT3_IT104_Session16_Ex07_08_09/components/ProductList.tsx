import React, { Component } from "react";
import ProductItem from "./ProductItem";

type Product = { id: number; name: string; image: string; price: number; stock: number; };
type Props = { products: Product[]; onAddToCart: (p: Product) => void; };

export default class ProductList extends Component<Props> {
  render() {
    const { products, onAddToCart } = this.props;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: 16, background: "#fafafa" }}>
        {products.map(p => (
          <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    );
  }
}