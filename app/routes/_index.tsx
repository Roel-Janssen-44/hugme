import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import Button from '~/components/Button';
import Hero from '~/components/Hero';
import ProductItem from '~/components/ProductItem';
import Subscribe from '~/components/Subscribe';

export const meta: MetaFunction = () => {
  return [
    {title: 'Can you hug______me, please? - Hug_me'},
    {
      description:
        'Emerged from the aesthetic need for a cool and slightly sarcastic community. Besides the so-called hug, it is important that we have peace in this terrible world',
    },
  ];
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
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
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

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <Hero />
      <p
        style={{maxWidth: 767}}
        className="container px-4 mx-auto max-w-[767px]"
      >
        Emerged from the aesthetic need for a cool and slightly sarcastic
        community. Besides the so-called hug, it is important that we have peace
        in this terrible world
      </p>
      <div className="relative pb-0 md:py-0 max-w-[1024px] mx-auto sm:py-8">
        <img
          className="absolute w-28 top-0 left-[65%] md:rotate-[-12deg] sm:left-[45%] sm:top-12 sm:w-32 h-auto -translate-x-1/2 md:left-56 md:top-8 lg:top-20 lg:left-64"
          src="/images/arrow.png"
        />
      </div>

      <div className="w-full container mt-40 px-4 mx-auto relative">
        <div
          className={
            'flex flex-col md:flex-row gap-10 justify-center max-w-[1024px] mx-auto'
          }
        >
          <div className="md:w-1/2 md:flex-1 md:pr-4 flex-col flex gap-4 justify-center">
            <h3 className="text-4xl text-left lg:text-5xl font-modak mb-0">
              A huge story
            </h3>

            <p className="text-md">
              Tap to see what&rsquo;s the origin of this beautiful brand
            </p>
            <div className="mb-4 md:mb-0">
              <Button link="/collections/all">See more</Button>
            </div>
          </div>
          <div className="md:w-1/2 md:flex-1 relative mr-4 md:pl-4 md:mr-4">
            <div className="-z-1 rounded-xl w-[calc(100%-1rem)] h-full border-primary border-4 absolute left-8 top-4" />
            <img
              src="/images/balcony.jpg"
              alt=""
              className="z-20 relative w-full h-auto pointer-events-none rounded-lg select-none object-cover"
            />
          </div>
        </div>
      </div>

      <FeaturedCollection collection={data.featuredCollection} />

      <Subscribe />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <div
      className=" bg-[#D3B897] overflow-hidden w-full py-32 my-32 px-4 mx-auto relative
                    sm:pt-40 md:mt-12 md:pt-48 lg:pt-56 xl:mt-12 xl:pt-64 2xl:pt-80 
                    sm:pb-48 sm:mb-24 md:mb-20 md:pb-48 lg:pb-56 lg:mb-12 xl:mb-12 xl:pb-64 2xl:pb-80 2xl:mb-3"
    >
      <img
        src="/wave.svg"
        alt=""
        aria-hidden
        className="big-wave absolute z-0 w-full h-auto top-0 -scale-y-[2] scale-x-[3] left-0 origin-center"
      />
      <img
        src="/wave.svg"
        alt=""
        aria-hidden
        className="big-wave absolute z-0 w-full h-auto -bottom-1 left-0 scale-x-[-3] scale-y-[2]"
      />
      <div className="container">
        <div
          className={
            'flex flex-col md:flex-row gap-10 justify-center max-w-[1280px] mx-auto'
          }
        >
          <div className="md:w-1/2 md:pr-4 flex-1 flex-col flex gap-4 justify-center">
            <h3 className="text-4xl text-left lg:text-5xl font-modak mb-0">
              {collection.title}
            </h3>
            <p className="text-md mx-auto">{collection.description}</p>
            <div className="mb-4 md:mb-0">
              <Button link={`/collections/${collection.handle}`}>
                See more
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex-1 relative mr-4 md:pl-4">
            <div className="z-1 rounded-xl w-[calc(100%)] md:w-[calc(100%-1rem)] h-full border-primary border-4 absolute left-4 top-4 md:left-8" />
            {image?.url && (
              <img
                src={image.url}
                alt=""
                className="z-20 relative w-full h-full pointer-events-none rounded-lg select-none object-cover "
              />
            )}
          </div>
        </div>
        <div className="flex max-w-[1280px] mx-auto flex-col sm:justify-between flex-wrap sm:flex-row mt-20 gap-10">
          {collection.products.edges.map(({node: product}) => (
            <>
              <ProductItem product={product} key={product.id} />
              {/* <ProductItem product={product} key={product.id + '2'} />
              <ProductItem product={product} key={product.id + '3'} />
              <ProductItem product={product} key={product.id + '4'} /> */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 4) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                altText
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;
