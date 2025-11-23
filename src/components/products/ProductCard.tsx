import { RootState } from "@/store/store";
import { ProductType } from "@/types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Button from "../ui/Button";
type ProductCardProps = {
  data: ProductType;
};
const ProductCard = ({ data }: ProductCardProps) => {
  const locale = useSelector((state: RootState) => state.locale.value);
  // Destructure product data
  const {
    id,
    sku,
    name,
    images,
    thumbnail,
    price,
    currency,
    brand,
    stock,
    colors,
    rating,
    reviewsCount,
    category,
    features,
    accessories,
    description,
    createdAt,
    updatedAt,
  } = data;
  const t = useTranslations("productCard");
  // StarRating component
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const full = i + 1 <= Math.floor(rating);
      const half = !full && i + 0.5 <= rating;

      stars.push(full ? <FaStar /> : half ? <FaStarHalfAlt /> : <FaRegStar />);
    }

    return (
      <span className="text-orange-400 text-base flex gap-1">
        {stars.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </span>
    );
  };
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  // Handle Add to Cart
  const onClickAddToCart = () => {
    console.log("Add to cart clicked");
  };
  return (
    <div className="product-card border p-4 rounded-lg shadow-md flex flex-col ltr:items-start rtl:items-end max-w-[300px]">
      <Image
        src={thumbnail || images?.[0] || "/placeholder.png"}
        alt={name[locale] || "Product Image"}
        width={200}
        height={200}
        className="w-full h-auto mb-2"
      />
      <div className="image-gallery flex gap-2 my-2 w-full">
        {images?.map((imgUrl, index) => (
          <Image
            key={index}
            src={imgUrl}
            alt={`${name[locale]} Image ${index + 1}`}
            width={50}
            height={50}
            className="w-[33%] object-cover rounded"
          />
        ))}
      </div>
      <p className="text-sm">{brand}</p>
      <h2 className="text-xl font-bold">{name[locale]}</h2>
      <p className="line-clamp-2 text-sm text-neutral-500 mb-2 ltr:text-left rtl:text-right">
        {description[locale]}
      </p>
      {StarRating({ rating: rating || 0 })}
      <p className="text-lg font-semibold my-2">
        {currency} {formattedPrice}
      </p>
      <Button click={onClickAddToCart}>
        {t("addToCart")} {currency} {formattedPrice}
      </Button>
    </div>
  );
};

export default ProductCard;
