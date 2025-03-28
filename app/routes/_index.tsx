import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import React, {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import Button from '~/components/Button';
import Hero from '~/components/Hero';
import ProductItem from '~/components/ProductItem';
import Subscribe from '~/components/Subscribe';
import Slider from '~/components/Slider';

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
    <div className="home relative">
      <Hero />

      <div className="hidden md:block container px-4 relative pb-0 max-w-[1280px] mx-auto sm:py-0.5 xl:p-0">
        <img
          className="absolute w-28 -top-10 left-[70%] md:rotate-[-12deg] sm:left-[55%] sm:-top-6 md:-top-8 sm:w-32 h-auto -translate-x-1/2 md:left-80 lg:-top-6 lg:left-[380px] xl:left-[35%] xl:-top-4"
          src="/images/arrow.png"
        />
      </div>

      <div className="mt-20 xl:mt-40">
        <FeaturedCollection collection={data.featuredCollection} />
      </div>

      <div
        className=" bg-[#D3B897] overflow-hidden w-full pb-40 pt-4 mt-6 mb-32 px-4 mx-auto relative
                    sm:pt-10 md:mt-12 md:pt-16 lg:pt-32 xl:mt-12 xl:pt-32 2xl:pt-64 
                    sm:pb-48 sm:mb-24 md:mb-24 md:pb-48 lg:pb-56 lg:mb-12 xl:mb-12 xl:pb-64 2xl:pb-80 2xl:mb-3"
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

        <div className="w-full container mt-40 px-4 mx-auto relative xl:mt-32">
          <div
            className={
              'flex flex-col md:flex-row gap-10 justify-center max-w-[1280px] mx-auto'
            }
          >
            <div className="md:w-1/2 md:flex-1 md:pr-4 flex-col flex gap-4 justify-center">
              <h3 className="text-4xl text-left lg:text-5xl font-modak mb-0">
                A hug story
              </h3>

              <p className="text-md">
                In today&rsquo;s society, we see an exciting aesthetic
                amalgamation of diverse trends that enrich our world. From the
                vibrant ceramics of Portugal to the handwoven textiles of Asia,
                each carefully selected product ensures the highest quality for
                our community of huggers.
              </p>
              <p className="text-md">
                Our mission is to create a platform that celebrates the beauty
                of different cultures while fostering connection and community.
                Each item tells a story, embodying love and artisanal skills
                passed down through generations.
              </p>
              <p className="text-md">
                With our Dutch roots, we aim to spread a message of peace and
                inclusivity worldwide. By collaborating with local artisans, we
                support sustainable practices and contribute to a more equitable
                world.
              </p>
              <p className="text-md">
                We invite our huggers community to make conscious choices and
                appreciate the stories behind the products. Together, we can
                create a positive impact and build a community committed to
                quality and respect for cultural traditions. Explore our
                collection and join our mission—together, we can make the world
                a brighter place.
              </p>
              <div className="mb-4 md:mb-0">
                <Button link="/pages/a-hug-story">See more</Button>
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
      </div>

      <Subscribe />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <div className="container mt-10 pt-10">
      <div
        className={
          'flex flex-col md:flex-row gap-10 justify-center max-w-[1280px] mx-auto'
        }
      >
        <div className="md:w-1/2 md:pr-4 flex-1 flex-col flex gap-4 justify-center">
          <h3 className="text-4xl xl:max-w-[400px] lg:max-w-[300px] text-left lg:text-5xl font-modak mb-0">
            {collection.title}
          </h3>
          <p className="text-md mx-auto">{collection.description}</p>
          <div className="mb-4 md:mb-0">
            <Button link={`/collections/${collection.handle}`}>See more</Button>
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
      {/* <div className="flex max-w-[1280px] mx-auto flex-col sm:justify-between flex-wrap sm:flex-row mt-20 gap-10">
        <div> */}
      <div>
        {collection?.products?.edges && (
          <Slider items={collection.products.edges} />
        )}
      </div>

      {/* </div>
      </div> */}

      {/* <div className="flex max-w-[1280px] mx-auto flex-col sm:justify-between flex-wrap sm:flex-row mt-20 gap-10"> */}
      {/* {collection.products.edges.map(({node: product}) => (
          <ProductItem product={product} key={product.id} />
        ))} */}
      {/* {collection.products.edges.map(({node: product}) => (
          <ProductItem product={product} key={product.id} />
        ))}
        {collection.products.edges.map(({node: product}) => (
          <ProductItem product={product} key={product.id} />
        ))}
        {collection.products.edges.map(({node: product}) => (
          <ProductItem product={product} key={product.id} />
        ))} */}
      {/* </div> */}
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
