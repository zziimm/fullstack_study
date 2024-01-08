export default function CartItem(props) {
  const { title } = props
  return (
    <div className="cart-item">
      <p>{title}</p>
      <p>500원</p>
      <p>1개</p>
    </div>
  );
}