import Button from '~/components/Button';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductItem({product}: {product: any}) {
  return (
    <Link
      className="product-item text-center w-full max-w-full sm:max-w-[268px] md:max-w-[338px] lg:max-w-[210px] xl:max-w-[274px]"
      key={product.id}
      prefetch="intent"
      to={`/products/${product.handle}`}
    >
      {product.images.edges[0].node && (
        <Image
          alt={product.images.edges[0].node.altText || product.title}
          src={product.images.edges[0].node.transformedSrc}
          loading={'lazy'}
          className="rounded-lg"
        />
      )}
      <h4 className="text-2xl px-2 text-center mt-3 font-modak mb-0">
        {product.title}
      </h4>
      <Money data={product.priceRange.minVariantPrice} />
    </Link>
  );
}
