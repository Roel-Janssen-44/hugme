'use client';

export default function Hero() {
  return (
    <div className="h-[80lvh] mb-20 px-4 md:px-6 md:mr-3">
      <div className="h-[80lvh] relative">
        <picture>
          <source
            srcSet={`/images/hero_mobile.webp`}
            media="(max-width: 1023px)"
          />
          <img
            src={`/images/hero.webp`}
            alt={`Carry the hug`}
            className="object-cover w-full h-full rounded-b-2xl"
          />
        </picture>
        <div className="-z-1 rounded-3xl w-[calc(100%-32px)] md:w-full h-[calc(100%+64px)] border-primary border-4 absolute left-4 -top-12" />
        <div className="rounded-b-2xl bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20" />
        <div className="z-20 container max-w-2xl text-center xl:max-w-3xl 2xl:max-w-4xl text-secondary mt-14 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-6xl lg:text-8xl font-modak mx-auto mb-4">
            Carry the hug
          </h3>
          <h4 className="text-lg lg:text-2xl mx-auto">
            Because a hug is always in style
          </h4>
        </div>
      </div>
    </div>
  );
}
