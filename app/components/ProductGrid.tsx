'use client';

import Grid from './Grid';
import ProductGridItem from './ProductGridItem';

export default function ProductGrid({
  collectionProducts,
}: {
  collectionProducts: any;
}) {
  console.log('collectionProducts');
  console.log(collectionProducts);
  return (
    <>
      <Grid>
        {collectionProducts?.map((product: any) => {
          return (
            <>
              <ProductGridItem key={product.id} product={product} />
              <ProductGridItem key={product.id + '1'} product={product} />
              <ProductGridItem key={product.id + '2'} product={product} />
              <ProductGridItem key={product.id + '3'} product={product} />
              <ProductGridItem key={product.id + '4'} product={product} />
              <ProductGridItem key={product.id + '5'} product={product} />
              <ProductGridItem key={product.id + '6'} product={product} />
              <ProductGridItem key={product.id + '7'} product={product} />
              <ProductGridItem key={product.id + '8'} product={product} />
              <ProductGridItem key={product.id + '11'} product={product} />
              <ProductGridItem key={product.id + '12'} product={product} />
              <ProductGridItem key={product.id + '13'} product={product} />
              <ProductGridItem key={product.id + '14'} product={product} />
              <ProductGridItem key={product.id + '15'} product={product} />
              <ProductGridItem key={product.id + '16'} product={product} />
              <ProductGridItem key={product.id + '17'} product={product} />
              <ProductGridItem key={product.id + '18'} product={product} />
            </>
          );
        })}
      </Grid>
    </>
  );
}
