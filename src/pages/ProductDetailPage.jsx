import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productDirectory, submitPurchaseRequest, user } = useAuth();
  const product = productDirectory.find((item) => item.id === id) || productDirectory[0];
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    submitPurchaseRequest({
      customerId: user.id,
      customerName: user.name,
      email: user.email,
      productId: product.id,
      productName: product.name,
      price: product.price,
      notes: `${product.name} requested by customer`,
    });

    setRequestSent(true);
  };

  if (!product) return <div className="role-page-shell"><div className="empty-state">Product not found.</div></div>;

  return (
    <div className="role-page-shell">
      <div className="product-detail-shell">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-body">
          <p className="eyebrow">{product.model}</p>
          <h1>{product.name}</h1>
          <div className="price-row"><strong>₹{product.price.toLocaleString("en-IN")}</strong><span>{product.availability}</span></div>
          <p className="page-description">{product.description}</p>

          <div className="feature-list detail-features">
            {product.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>

          <div className="info-grid compact-grid">
            <div><span>Warranty</span><strong>{product.warranty}</strong></div>
            <div><span>Availability</span><strong>{product.availability}</strong></div>
            <div><span>Sensors</span><strong>{product.sensors.join(", ")}</strong></div>
            <div><span>Navigation</span><strong>{product.navigation.join(", ")}</strong></div>
          </div>

          <div className="action-row large-actions">
            <button type="button" className="secondary-action">Buy now</button>
            <button type="button" className="primary-action" onClick={handleSubmit}>{requestSent ? "Request submitted" : "Request to buy"}</button>
          </div>

          {requestSent && <div className="success-box">Request submitted successfully. Status: Pending</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
