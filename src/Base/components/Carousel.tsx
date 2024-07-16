/* eslint-disable import/no-unresolved */
import { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps extends BoxProps {
  items: { id: string; content: ReactNode }[];
}

const Carousel = ({ items = [], ...boxProps }: CarouselProps) => (
 <Box
    navigation
    as={Swiper}
    modules={[Navigation, Pagination]}
    pagination={{ clickable: true }}
    preventClicks={false}
    preventClicksPropagation={false}
    simulateTouch={false}
    {...boxProps}
  >
    {items.map((item) => (
      <SwiperSlide key={item.id}>{item.content}</SwiperSlide>
    ))}
  </Box>
);

export default Carousel;
