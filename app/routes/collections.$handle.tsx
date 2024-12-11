import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {
  getPaginationVariables,
  Image,
  Money,
  Analytics,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import ProductGrid from '~/components/ProductGrid';
import ProductGridItem from '~/components/ProductGridItem';
// import {useState} from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="relative container flex flex-col gap-8 md:flex-row">
      <div className="flex-1">
        <div className="sm:border-4 sm:border-primary flex flex-col sm:flex-row sm:items-center gap-4 py-4 sm:p-4 mb-8 rounded-md">
          <div className="relative min-w-[150px]">
            <img
              className="hidden sm:block rounded-md"
              src={collection.image.url}
              alt={collection.image.altText}
              width={150}
              height={150}
            />
          </div>
          <div className="">
            <h1 className="text-4xl font-modak mb-2">{collection.title}</h1>
            <p
              className="max-w-[676px]"
              dangerouslySetInnerHTML={{__html: collection.description}}
            ></p>
          </div>
        </div>
        {/* <ProductGrid collectionProducts={collection.products.nodes} /> */}
        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="products-grid"
        >
          {({node: product, index}) => (
            <>
              <ProductGridItem
                classes="2xl:w-[500px]"
                key={product.id}
                product={product}
              />
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
          )}
        </PaginatedResourceSection>
      </div>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

// function ProductItem({
//   product,
//   loading,
// }: {
//   product: ProductItemFragment;
//   loading?: 'eager' | 'lazy';
// }) {
//   const variant = product.variants.nodes[0];
//   const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
//   return (
//     <Link
//       className="product-item"
//       key={product.id}
//       prefetch="intent"
//       to={variantUrl}
//     >
//       {product.featuredImage && (
//         <Image
//           alt={product.featuredImage.altText || product.title}
//           aspectRatio="1/1"
//           data={product.featuredImage}
//           loading={loading}
//           sizes="(min-width: 45em) 400px, 100vw"
//         />
//       )}
//       <h4>{product.title}</h4>
//       <small>
//         <Money data={product.priceRange.minVariantPrice} />
//       </small>
//     </Link>
//   );
// }

// const PRODUCT_ITEM_FRAGMENT = `#graphql
//   fragment MoneyProductItem on MoneyV2 {
//     amount
//     currencyCode
//   }
//   fragment ProductItem on Product {
//     id
//     handle
//     title
//     featuredImage {
//       id
//       altText
//       url
//       width
//       height
//     }
//     priceRange {
//       minVariantPrice {
//         ...MoneyProductItem
//       }
//       maxVariantPrice {
//         ...MoneyProductItem
//       }
//     }
//     variants(first: 1) {
//       nodes {
//         selectedOptions {
//           name
//           value
//         }
//       }
//     }
//   }
// ` as const;

// // NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
// const COLLECTION_QUERY = `#graphql
//   ${PRODUCT_ITEM_FRAGMENT}
//   query Collection(
//     $handle: String!
//     $country: CountryCode
//     $language: LanguageCode
//     $first: Int
//     $last: Int
//     $startCursor: String
//     $endCursor: String
//   ) @inContext(country: $country, language: $language) {
//     collection(handle: $handle) {
//       id
//       handle
//       title
//       description
//       products(
//         first: $first,
//         last: $last,
//         before: $startCursor,
//         after: $endCursor
//       ) {
//         nodes {
//           ...ProductItem
//         }
//         pageInfo {
//           hasPreviousPage
//           hasNextPage
//           endCursor
//           startCursor
//         }
//       }
//     }
//   }
// ` as const;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    title
    id
    handle
    images(first: 2) {
      nodes {
        altText
        height
        url
        width
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
    options(first: 1) {
      name
      values
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { 
        altText
        height
        url
        width
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor, 
        after: $endCursor
        
      ) {
        nodes { 
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
