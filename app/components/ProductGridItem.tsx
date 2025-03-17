'use client';

import {Money} from '@shopify/hydrogen';

export default function ProductGridItem({product}: {product: any}) {
  if (!product?.handle) return null;

  return (
    <a
      href={`/products/${product.handle}`}
      className={`py-8 w-full sm:w-[288px] md:w-[332px] lg:w-[303px] xl:w-[295px] 2xl:w-[328px] animation-all duration-500 "`}
    >
      <div className="relative block mx-auto">
        <img
          src={product?.images?.nodes[0]?.url}
          alt={product?.images?.nodes[0]?.altText}
          className={`w-full h-full object-cover rounded-lg`}
        />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-3xl font-modak mt-2 mb-1  group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <span className="text-md font-montserrat mt-4 text-primary">
          {product.priceRange?.minVariantPrice && (
            <Money data={product.priceRange.minVariantPrice} />
          )}
        </span>
      </div>
    </a>
  );
}
