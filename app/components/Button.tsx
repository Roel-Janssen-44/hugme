export default function Button({
  link,
  className,
  children,
  handleClick,
}: {
  link?: string;
  className?: string;
  children: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`${className} cursor-pointer w-36 h-auto group relative block`}
      onClick={handleClick}
    >
      {link ? (
        <a href={link}>
          <InnerButton children={children} />
        </a>
      ) : (
        <InnerButton children={children} />
      )}
    </button>
  );
}

const InnerButton = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <img src="images/button.png" alt="" className="group-hover:opacity-90" />
      <span className="absolute left-1/2 top-1/2 text-md font-bold -translate-x-1/2 -translate-y-1/2 text-secondary z-20">
        {children}
      </span>
    </>
  );
};
