import Button from '~/components/Button';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductItem({product}: {product: any}) {
  console.log(product);
  return (
    <Link
      className="product-item mb-8 relative text-center w-full max-w-full sm:max-w-[268px] md:max-w-[332px] lg:max-w-[210px] xl:max-w-[274px]"
      key={product.node.id}
      prefetch="intent"
      to={`/products/${product.node.handle}`}
    >
      {product.node.images?.edges[0]?.node && (
        <Image
          alt={
            product.node.images?.edges[0]?.node.altText || product.node.title
          }
          src={product.node.images?.edges[0]?.node.transformedSrc}
          loading={'lazy'}
          className="rounded-lg"
        />
      )}
      {!product.node.images?.edges[0]?.node && (
        <div
          className={`w-full h-auto aspect-square animate-pulse bg-gray-100 opacity-50 rounded-lg`}
        ></div>
      )}
      <h4 className="text-2xl px-2 text-center mt-3 font-modak mb-0">
        {product.node.title}
      </h4>
      <Money data={product.node.priceRange?.minVariantPrice} />
    </Link>
  );
}
