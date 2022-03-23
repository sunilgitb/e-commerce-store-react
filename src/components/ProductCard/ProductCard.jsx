import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/wishlistContext";

const ProductCard = ({ product }) => {
  const { _id, title, price, discount, discountedPrice, image } = product;
  const { wishlist, toggleWishlist } = useWishlist();

  const itemInWishlist = wishlist.find((item) => item._id === _id);

  return (
    <div className="card-wrapper basic-card card-w-dismiss">
      <div>
        <Link to="/">
          <img src={image} className="card-img" alt={title} />
        </Link>

        <div className="card-dismiss">
          <button>
            <i
              className={itemInWishlist ? "fa fa-heart" : "fa fa-heart-o"}
              onClick={() => toggleWishlist(product)}
            ></i>
          </button>
        </div>

        <div className="card-heading" title={title}>
          {title}
        </div>
      </div>

      <div className="card-content">
        <div className="product-price">
          <div className="price">&#8377; {discountedPrice}</div>
          <div className="previous-price">&#8377; {price}</div>
          <div className="discount">{discount}% off</div>
        </div>
      </div>

      <div className="card-action">
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export { ProductCard };
