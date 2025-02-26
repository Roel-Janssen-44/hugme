'use client';

import {Swiper, SwiperSlide} from 'swiper/react';
import ProductItem from '~/components/ProductItem';

export default function Slider({items}: {items: any[]}) {
  console.log('Items:', items);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={'auto'}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="mt-10"
    >
      {/* <Swiper spaceBetween={50} slidesPerView={3}> */}
      {items.map((product) => {
        if (!product || !product?.node.id) {
          console.warn('Invalid product:', product);
          return null;
        }

        return (
          <SwiperSlide className="max-w-[268px]" key={product?.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        );
      })}
      {/* <SwiperSlide key={1}>
        <p>kahsgbd</p>
      </SwiperSlide>
      <SwiperSlide key={2}>
        <p>kahsgbd</p>
      </SwiperSlide>
      <SwiperSlide key={3}>
        <p>kahsgbd</p>
      </SwiperSlide>
      <SwiperSlide key={4}>
        <p>kahsgbd</p>
      </SwiperSlide>
      <SwiperSlide key={5}>
        <p>kahsgbd</p>
      </SwiperSlide> */}
    </Swiper>
  );
}

// 'use client';

// // import {useState, useRef} from 'react';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import {useState, useEffect} from 'react';
// import 'swiper/css';
// import ProductItem from '~/components/ProductItem';

// export default function Slider({items}: {items: any[]}) {
//   // const [currentIndex, setCurrentIndex] = useState(0);
//   // const touchStartX = useRef<number | null>(null);
//   // const touchEndX = useRef<number | null>(null);

//   // console.log('items');
//   // console.log(items);

//   // const nextSlide = () => {
//   //   setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   // };

//   // const prevSlide = () => {
//   //   setCurrentIndex((prevIndex) =>
//   //     prevIndex === 0 ? items.length - 1 : prevIndex - 1,
//   //   );
//   // };

//   // const handleTouchStart = (e: React.TouchEvent) => {
//   //   touchStartX.current = e.touches[0].clientX;
//   // };

//   // const handleTouchMove = (e: React.TouchEvent) => {
//   //   touchEndX.current = e.touches[0].clientX;
//   // };

//   // const handleTouchEnd = () => {
//   //   if (touchStartX.current !== null && touchEndX.current !== null) {
//   //     const deltaX = touchStartX.current - touchEndX.current;
//   //     if (deltaX > 50) nextSlide();
//   //     else if (deltaX < -50) prevSlide();
//   //   }
//   //   touchStartX.current = null;
//   //   touchEndX.current = null;
//   // };

//   console.log(items);

//   const [client, setClient] = useState(false);

//   useEffect(() => {
//     setClient(true);
//   }, []);

//   return 'hasdljk';
//   return (
//     <>
//       {client && (
//         <Swiper
//           spaceBetween={50}
//           slidesPerView={3}
//           onSlideChange={() => console.log('slide change')}
//           onSwiper={(swiper) => console.log(swiper)}
//         >
//           {items.map((product) => (
//             <>
//               <SwiperSlide key={product.id}>
//                 <ProductItem product={product} />
//               </SwiperSlide>
//               <SwiperSlide key={product.id + '1'}>
//                 <ProductItem product={product} />
//               </SwiperSlide>
//               <SwiperSlide key={product.id + '2'}>
//                 <ProductItem product={product} />
//               </SwiperSlide>
//               <SwiperSlide key={product.i + '3'}>
//                 <ProductItem product={product} />
//               </SwiperSlide>
//               <SwiperSlide key={product.id + '4'}>
//                 <ProductItem product={product} />
//               </SwiperSlide>
//             </>
//           ))}
//         </Swiper>
//       )}
//     </>

//     // <div className="relative w-80 h-80 overflow-hidden">
//     //   {items?.map((item, index) => (
//     //     <div
//     //       key={index}
//     //       className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-500 ${
//     //         currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
//     //       }`}
//     //       //   style={{ backgroundColor: item.color }} // Assuming items have a `color` property
//     //       style={{backgroundColor: '#00ff00'}}
//     //       onTouchStart={handleTouchStart}
//     //       onTouchMove={handleTouchMove}
//     //       onTouchEnd={handleTouchEnd}
//     //     >
//     //       {item.title}
//     //     </div>
//     //   ))}
//     //   <button
//     //     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
//     //     onClick={prevSlide}
//     //   >
//     //     ❮
//     //   </button>
//     //   <button
//     //     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
//     //     onClick={nextSlide}
//     //   >
//     //     ❯
//     //   </button>
//     // </div>
//   );
// }
