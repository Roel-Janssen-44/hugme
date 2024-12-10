import Button from '~/components/Button';
import {useState, useEffect} from 'react';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className="w-full container mt-40 px-4 mx-auto relative">
      <div
        className={
          'flex flex-col md:flex-row gap-10 justify-center max-w-[1024px] mx-auto'
        }
      >
        <div className="md:w-1/2 md:flex-1 md:pr-4 flex-col flex gap-4 justify-center">
          <h3 className="text-4xl text-left lg:text-5xl font-modak mb-0">
            subscribe to become a vip
          </h3>
          <input
            onChange={handleChange}
            className="text-md mx-auto"
            value={email}
            placeholder="example@gmail.com"
          />
          <div className="mb-4 md:mb-0">
            <Button handleClick={handleClick}>Confirm</Button>
          </div>
        </div>
        <div className="md:w-1/2 md:flex-1 relative mr-4 md:pl-4 md:mr-4">
          <div className="-z-1 rounded-xl w-full md:w-[calc(100%-1rem)] h-full border-primary border-4 absolute left-8 top-4" />
          <img
            src="/images/origin.JPG"
            alt=""
            className="z-20 relative w-full h-auto pointer-events-none rounded-lg select-none object-cover"
          />
        </div>
      </div>
    </div>
  );
}
