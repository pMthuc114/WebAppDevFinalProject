import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../redux/apis/productApi";
import { handleAddToCart } from "../redux/actions/cartActions";
import { useUpdateCartMutation } from "../redux/apis/cartApi";
import PageWrapper from "../components/PageWrapper";
import { toast } from "react-toastify";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl select-none ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          role="button"
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const [updateCart] = useUpdateCartMutation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = product?.size || [];
  const colors = product?.color || [];

  const handleAddToCartClick = async () => {
    if (!selectedSize) return toast.error("Please select a size!");
    if (!selectedColor) return toast.error("Please select a color!");
    if (!product) return toast.error("Product is not ready!");

    try {
      await handleAddToCart(
        dispatch,
        {
          ...product,
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
        updateCart,
        user?._id
      );
      toast.success("Added to cart successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding to cart.");
    }
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching product</div>;

  return (
    <PageWrapper>
      <div className="p-10 flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-1/3 flex flex-col justify-center px-4">
    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
    <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
  </div>

  <div className="w-full md:w-1/3 flex items-center justify-center px-4">
    <img
      src={product.image}
      alt={product.name}
      className="max-h-[400px] object-contain rounded border border-gray-300 p-2 shadow-lg"
    />
  </div>

  <div className="w-full md:w-1/3 flex flex-col gap-4 px-4">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <p className="text-2xl">${product.price?.toFixed(2)}</p>

    <div>
      <h3 className="mb-2">Color</h3>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedColor === color
                ? "bg-primary text-white"
                : "border border-gray-300"
            }`}
            onClick={() => setSelectedColor(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h3 className="mb-2">Size</h3>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`border border-gray-300 p-2 text-center rounded-full ${
              selectedSize === size ? "border-primary bg-primary text-white" : ""
            } hover:border-primary hover:bg-primary hover:text-white transition`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    <div className="w-1/3">
      <h3 className="mb-2">Qty</h3>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            setQuantity("");
          } else {
            const num = Number(val);
            if (!isNaN(num) && num > 0) setQuantity(num);
          }
        }}
        onBlur={() => {
          if (quantity === "" || quantity < 1) setQuantity(1);
        }}
        className="w-full border border-gray-300 p-2 rounded-full text-center"
      />
    </div>

    <button
      className="bg-primary text-white py-3 w-full rounded-full font-semibold text-lg shadow hover:bg-green-800 transition"
      onClick={handleAddToCartClick}
    >
      Add to Cart
    </button>
  </div>
</div>
    </PageWrapper>
  );
};

export default ProductDetail;
