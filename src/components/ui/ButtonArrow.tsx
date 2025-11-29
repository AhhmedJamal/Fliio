import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperClass } from "swiper";

interface ButtonArrowProps {
  swiperRef: React.RefObject<SwiperClass | null>;
  children?: React.ReactNode;
  isChildren?: boolean;
  isBeginning?: boolean;
  isEnd?: boolean;
  title?: string;
}

const ButtonArrow: React.FC<ButtonArrowProps> = ({
  swiperRef,
  children,
  isChildren = false,
  isBeginning = false,
  isEnd = false,
  title,
}) => {
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const leftButtonAnimation = {
    scale: 1.1,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
    x: [-5, 0, -5, 0],
  };

  const rightButtonAnimation = {
    scale: 1.1,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
    x: [5, 0, 5, 0],
  };

  if (isChildren) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex md:hidden w-full justify-between items-center mb-4">
          {title && <p className="text-2xl font-bold">{title}</p>}
          <div className="flex gap-3">
            <motion.button
              whileHover={leftButtonAnimation}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={handlePrev}
              disabled={isBeginning}
              className="p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-white text-2xl rtl:rotate-180" />
            </motion.button>

            <motion.button
              whileHover={rightButtonAnimation}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={handleNext}
              disabled={isEnd}
              className="p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-white text-2xl rtl:rotate-180" />
            </motion.button>
          </div>
        </div>
        <motion.button
          whileHover={leftButtonAnimation}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handlePrev}
          disabled={isBeginning}
          className="hidden md:block p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-white text-2xl rtl:rotate-180" />
        </motion.button>
        {children}
        <motion.button
          whileHover={rightButtonAnimation}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleNext}
          disabled={isEnd}
          className="hidden md:block p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-white text-2xl rtl:rotate-180" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      {title && <p className="text-2xl md:text-3xl font-bold">{title}</p>}
      <div className="flex gap-3">
        <motion.button
          whileHover={leftButtonAnimation}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handlePrev}
          disabled={isBeginning}
          className="p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-white text-2xl rtl:rotate-180" />
        </motion.button>

        <motion.button
          whileHover={rightButtonAnimation}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleNext}
          disabled={isEnd}
          className="p-3 rounded-full transition-all duration-300 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-white text-2xl rtl:rotate-180" />
        </motion.button>
      </div>
    </div>
  );
};

export default ButtonArrow;
