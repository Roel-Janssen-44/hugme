import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import Button from '~/components/Button';
interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <footer className="pt-48 mt-24 relative overflow-x-hidden">
      <img
        src="/lijn.svg"
        className="-z-1 absolute top-0 left-0 scale-x-[6] scale-y-[3.5] sm:scale-x-[3] sm:scale-y-[2.5] md:scale-y-[2] lg:scale-y-[1.5] lg:scale-x-[2] xl:scale-y-100 origin-top"
        alt=""
        aria-hidden
      />

      <div className="container flex flex-col gap-8 md:flex-row md:flex-wrap md:items-center xl:flex-nowrap xl:items-start">
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px]">
          <h4 className="text-3xl text-left lg:text-4xl font-modak mb-0">
            Pages
          </h4>
          <ul>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/collections/all"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/search"
              >
                Search
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/size-guide"
              >
                Size guide
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] xl:border-l-primary">
          <h4 className="text-3xl text-left lg:text-4xl font-modak mb-0">
            Contact
          </h4>
          <ul>
            <li className="py-1">Trade name: Hug_me</li>
            <li className="flex flex-row items-center gap-1">
              Email:{' '}
              <a
                className="py-1 block hover:opacity-60 underline transition-opacity"
                href="mailto:hugme@desixury.com"
              >
                hugme@desixury.com
              </a>
            </li>
            <li className="py-1">
              Return address: Heer Ottostraat 33A, 6121 NB Born, Nederland
            </li>
            <li className="py-1">Chamber of commerce number: 74022687</li>
          </ul>
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] 2xl:mt-0">
          <h4 className="text-3xl text-left lg:text-4xl font-modak mb-0">
            Socials
          </h4>
          <ul>
            <li className="flex flex-row items-center gap-1">
              Insta:
              <a
                className="py-1 block hover:opacity-60 underline transition-opacity"
                href="instagram.com"
                target="_blank"
                rel="nofollow"
              >
                @hugme
              </a>
            </li>
            <li className="flex flex-row items-center gap-1">
              Tiktok:
              <a
                className="py-1 block hover:opacity-60 underline transition-opacity"
                href="instagram.com"
                target="_blank"
                rel="nofollow"
              >
                @hugme
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] 2xl:mt-0 xl:hidden"></div>
      </div>

      <div className="border-t-4 text-center mb-0 mt-6 py-2 border-primary">
        <ul className="container gap-6 flex flex-row flex-center items-center justify-center">
          <li>
            <a
              className="py-1 block hover:opacity-60 transition-opacity"
              href="/policies/privacy-policy"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className="py-1 block hover:opacity-60 transition-opacity"
              href="/policies/refund-policy"
            >
              Refund Policy
            </a>
          </li>
          <li>
            <a
              className="py-1 block hover:opacity-60 transition-opacity"
              href="/policies/terms-of-service"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
