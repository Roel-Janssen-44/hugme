import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`header px-6 fixed flex flex-row flex-wrap top-0 left-0 w-full z-30 md:px-20 ${
        scrolled ? 'bg-secondary text-primary' : 'bg-transparent text-secondary'
      }`}
    >
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img
          alt="Logo Hugme"
          src="/images/logo_light.png"
          className={`w-16 h-auto ${scrolled ? 'hidden' : 'inline'}`}
        />
        <img
          alt="Logo Hugme"
          src="/images/logo_dark.png"
          className={`w-16 h-auto p-2 ${scrolled ? 'inline' : 'hidden'}`}
        />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        scrolled={scrolled}
      />
      <HeaderCtas scrolled={scrolled} isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  scrolled,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  scrolled: boolean;
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={`header-menu-item text-primary lg:mx-3 lg:px-2 ${
              scrolled ? 'lg:text-primary' : 'lg:text-secondary'
            }`}
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
  scrolled,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'> & {scrolled: boolean}) {
  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle scrolled={scrolled} />
      <CartToggle cart={cart} scrolled={scrolled} />
      <HeaderMenuMobileToggle scrolled={scrolled} />
    </nav>
  );
}

function HeaderMenuMobileToggle({scrolled}: {scrolled: boolean}) {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset cursor-pointer w-12 h-12 p-3"
      onClick={() => open('mobile')}
    >
      {scrolled ? (
        <img alt="Menu icon" src="/images/menu_dark.svg" />
      ) : (
        <img alt="Menu icon" src="/images/menu.svg" />
      )}
    </button>
  );
}

function SearchToggle({scrolled}: {scrolled: boolean}) {
  const {open} = useAside();
  return (
    <button
      className=" reset cursor-pointer w-12 h-12 p-3"
      onClick={() => open('search')}
    >
      {scrolled ? (
        <img alt="Search icon" src="/images/search_dark.svg" />
      ) : (
        <img alt="Search icon" src="/images/search.svg" />
      )}
    </button>
  );
}

function CartBadge({
  count,
  scrolled,
}: {
  count: number | null;
  scrolled: boolean;
}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="w-12 h-12 p-3 relative"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      {scrolled ? (
        <img alt="Shopping cart icon" src="/images/shop_dark.svg" />
      ) : (
        <img alt="Shopping cart icon" src="/images/shop.svg" />
      )}
      <span
        className={`absolute right-1 top-1 ${
          scrolled ? 'text-primary' : 'text-secondary'
        }`}
      >
        {count === null ? <span>&nbsp;</span> : count}
      </span>
    </a>
  );
}

function CartToggle({
  cart,
  scrolled,
}: Pick<HeaderProps, 'cart'> & {scrolled: boolean}) {
  return (
    <Suspense fallback={<CartBadge scrolled={scrolled} count={null} />}>
      <Await resolve={cart}>
        <CartBanner scrolled={scrolled} />
      </Await>
    </Suspense>
  );
}

function CartBanner({scrolled}: {scrolled: boolean}) {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge scrolled={scrolled} count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
  };
}
