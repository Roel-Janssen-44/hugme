import type {EntryContext, AppLoadContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  // const {nonce, header, NonceProvider} = createContentSecurityPolicy({
  //   shop: {
  //     checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
  //     storeDomain: context.env.PUBLIC_STORE_DOMAIN,
  //   },
  // });

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    connectSrc: [
      'https://c78ee0-2.myshopify.com/api/2024-07/graphql.json',
      'https://api.web3forms.com/submit',
    ],

    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'data:',
      'https://rose-historic-gayal-881.mypinata.cloud',
    ],
    frameSrc: ['https://www.youtube.com', 'https://www.instagram.com/'],
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'https://fonts.googleapis.com',
    ],

    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
    ],
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://www.instagram.com',
      'https://www.embedista.com',
      'http://www.instagram.com/embed.js',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
