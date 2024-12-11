'use client';

import {useLocation} from '@remix-run/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/chadcn/Breadcrumb';

export default function BreadcrumbComp() {
  const location = useLocation();
  const pathname = location.pathname;
  const urlParts = pathname.split('/').filter(Boolean);

  if (urlParts[0] == undefined) return null;
  return (
    <div className="relative h-80 flex justify-center items-center mb-20 bg-gray-100">
      <div className="z-10 absolute left-0 top-0 w-full h-full">
        <picture>
          <source
            srcSet={`/images/hero_mobile.webp`}
            media="(max-width: 1023px)"
          />
          <img
            loading="eager"
            src={`/images/hero.webp`}
            alt={`Carry the hug`}
            className="object-cover w-full h-full rounded-b-2xl"
          />
        </picture>
      </div>
      <div className="z-10 w-full h-full absolute left-0 top-0 bg-black opacity-20"></div>
      <div className="z-20 text-center text-secondary absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2">
        <Breadcrumb>
          <BreadcrumbList>
            <a
              className="hover:underline"
              style={{color: '#EBD3B0'}}
              color="inherit"
              href="/"
            >
              Home
            </a>
            {urlParts[0] != 'pages' && (
              <>
                {' / '}
                <Breadcrumb1 urlParts={urlParts} />
              </>
            )}
            {urlParts[1] && (
              <>
                {' / '}
                <Breadcrumb2 urlParts={urlParts} />
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

export function Breadcrumb1({urlParts}) {
  if (!urlParts[0]) return null;

  const url = urlParts[0];
  let link = '';
  if (url == 'collections') {
    link = '/collections/all';
  } else if (url == 'products') {
    link = '/collections/all';
  }

  if (urlParts[1]) {
    return (
      <>
        <a
          style={{color: '#EBD3B0'}}
          className="hover:underline text-secondary"
          color="#EBD3B0"
          href={link}
        >
          {urlParts[0].charAt(0).toUpperCase() + urlParts[0].slice(1)}
        </a>
      </>
    );
  } else {
    return <span>{urlParts[0]}</span>;
  }
}
export function Breadcrumb2({urlParts}) {
  if (!urlParts[0] || !urlParts[1]) return null;

  if (urlParts[1]) {
    return (
      <>
        <span
          style={{color: '#EBD3B0'}}
          className="text-secondary"
          href={`/${urlParts[0]}/${urlParts[1]}`}
          aria-current="page"
        >
          {urlParts[1].charAt(0).toUpperCase() + urlParts[1].slice(1)}
        </span>
      </>
    );
  }
}
