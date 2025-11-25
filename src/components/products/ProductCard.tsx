import { RootState } from "@/store/store";
import { ProductType } from "@/types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useState } from "react";
import Button from "../ui/Button";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const locale = useSelector((state: RootState) => state.locale.value);
  const product = props.product;
  const t = useTranslations("productCard");
  const [heart, setHeart] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.thumbnail || product.images?.[0] || "/placeholder.png"
  );
  const displayImages = product.images?.slice(0, 3) || [];

  // Handle image change with transition
  const handleImageChange = (imgUrl: string) => {
    if (imgUrl === selectedImage) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedImage(imgUrl);
      setIsTransitioning(false);
    }, 350);
  };

  // StarRating component
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const full = i + 1 <= Math.floor(rating);
      const half = !full && i + 0.5 <= rating;

      stars.push(
        full ? (
          <FaStar size={14} />
        ) : half ? (
          <FaStarHalfAlt size={14} />
        ) : (
          <FaRegStar size={14} />
        )
      );
    }

    return (
      <span className="text-orange-400 text-base flex gap-1">
        {stars.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </span>
    );
  };

  // Format product.price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  // Handle Add to Cart
  const onClickAddToCart = () => {
    handleSuccessClick();
  };

  const handleSuccessClick = () => {
    toast.success("Successfully added to cart", {
      description: product.name[locale],
      action: {
        label: "Undo",
        onClick: () => {
          toast.error("Done Remove to cart");
        },
      },
    });
  };
  const handleHeart = () => {
    setHeart(!heart);
  };
  return (
    <div className="product-card p-4 rounded-lg shadow-md flex flex-col items-start w-full bg-white group">
      <div className="relative overflow-hidden rounded w-full">
        <div className="icons absolute top-2 -right-10 group-hover:right-1  transition-all duration-500 flex flex-col gap-2 z-10">
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform border-neutral-300 border"
          >
            <AiOutlineEye size={25} />
          </motion.div>

          <motion.div
            onClick={handleHeart}
            whileTap={{ scale: 0.8 }}
            className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform border-neutral-300 border"
          >
            <AnimatePresence mode="wait">
              {heart ? (
                <motion.div
                  key="filled"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0, 1.3, 1],
                    rotate: [0, -10, 10, 0],
                  }}
                  exit={{ scale: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "backOut",
                  }}
                >
                  <RiHeart3Fill color="red" size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="outline"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiHeart3Line size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <Image
          src={selectedImage}
          alt={product.name[locale] || "Product Image"}
          width={100}
          height={100}
          quality={50}
          className={`w-full h-auto mb-2  rounded transition-all duration-300 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />
      </div>

      <div className="image-gallery flex gap-2 my-2 w-full">
        {displayImages.map((imgUrl, index) => (
          <Image
            key={index}
            src={imgUrl}
            alt={`${product.name[locale]} Image ${index + 1}`}
            width={50}
            height={50}
            quality={30}
            className={`w-1/5 object-cover rounded cursor-pointer transition-all duration-200 hover:opacity-75 hover:scale-105 ring ${
              selectedImage === imgUrl
                ? "ring-neutral-500 scale-105"
                : "ring-neutral-300 hover:ring-neutral-400"
            }`}
            onClick={() => handleImageChange(imgUrl)}
          />
        ))}
      </div>
      <div className=" w-full flex items-center justify-between my-0.5">
        <p className="text-sm text-neutral-400">{product.brand}</p>
        {StarRating({ rating: product.rating || 0 })}
      </div>
      <h2 className="text-lg font-bold">{product.name[locale]}</h2>

      <p className="text-sm font-semibold my-1">
        {product.currency} {formattedPrice}
      </p>

      <Button click={onClickAddToCart} styles="text-xs ">
        {t("addToCart")} {product.currency} {formattedPrice}
      </Button>
    </div>
  );
};

export default ProductCard;


