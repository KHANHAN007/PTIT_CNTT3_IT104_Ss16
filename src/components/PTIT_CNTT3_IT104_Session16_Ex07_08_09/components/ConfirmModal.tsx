import React, { Component } from "react";

type Props = {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default class ConfirmModal extends Component<Props> {
  render() {
    const { title = "Xác nhận", message, onConfirm, onCancel } = this.props;
    return (
      <div style={overlay}>
        <div style={modal}>
          <h4 style={{ marginTop: 0 }}>{title}</h4>
          <p style={{ margin: "8px 0 20px" }}>{message}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button onClick={onCancel} style={btnSecondary}>Hủy</button>
            <button onClick={onConfirm} style={btnPrimary}>Xóa</button>
          </div>
        </div>
      </div>
    );
  }
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 300
};
const modal: React.CSSProperties = {
  background: "#fff",
  color: "#111",
  padding: "20px 24px",
  borderRadius: 10,
  width: 380,
  boxShadow: "0 8px 30px rgba(0,0,0,.35)",
  fontFamily: "sans-serif"
};
const baseBtn: React.CSSProperties = {
  border: "none",
  padding: "8px 18px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600
};
const btnPrimary: React.CSSProperties = {
  ...baseBtn,
  background: "#d60000",
  color: "#fff"
};
const btnSecondary: React.CSSProperties = {
  ...baseBtn,
  background: "#e5e7eb",
  color: "#111"
};