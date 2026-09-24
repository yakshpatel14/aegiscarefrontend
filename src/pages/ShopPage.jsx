import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ShopPage() {
  const { productDirectory } = useAuth();

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">EXPLORE AEGISCARE</p>
          <h1>Robots designed for daily care</h1>
          <p className="page-description">Choose a robot, review features, and submit a purchase request.</p>
        </div>
      </div>

      <div className="shop-grid">
        {productDirectory.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-body">
              <div className="product-header-row">
                <div>
                  <p className="section-label">{product.model}</p>
                  <h3>{product.name}</h3>
                </div>
                <span className="status-pill success">{product.status}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="feature-list">
                {product.features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
              <div className="product-meta-row">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                <span>{product.availability}</span>
              </div>
              <div className="action-row">
                <Link to={`/shop/${product.id}`} className="secondary-action">View details</Link>
                <Link to={`/shop/${product.id}`} className="primary-action">Request to buy</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
