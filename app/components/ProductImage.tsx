import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
}: {
  image: ProductVariantFragment['image'];
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image mb-8 md:mb-0">
      <Image
        alt={image.altText || 'Product Image'}
        // aspectRatio="1/1"
        data={image}
        key={image.id}
        className="rounded-lg"
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
