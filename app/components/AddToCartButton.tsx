import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            className={`w-32 h-auto group relative block ${
              disabled ?? fetcher.state !== 'idle'
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            <img
              src="/images/button.png"
              alt=""
              className="group-hover:opacity-90"
            />
            <span className="absolute left-1/2 top-1/2 text-md font-bold -translate-x-1/2 -translate-y-1/2 text-secondary z-20">
              {children}
            </span>
          </button>
        </>
      )}
    </CartForm>
  );
}
