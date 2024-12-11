'use client';

export default function Grid({children}: {children: any}) {
  return (
    <div
      className={`w-full flex flex-col items-center sm:flex-row flex-wrap justify-center sm:justify-start gap-2`}
    >
      {children}
    </div>
  );
}
