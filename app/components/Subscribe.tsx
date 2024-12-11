import Button from '~/components/Button';
import {useState, useEffect} from 'react';
import {signupToNewsletter} from '../lib/actions';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    console.log('clicked');
  };

  const [status, setStatus] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') as string;
    if (!email) {
      return;
    }
    signup(email);
  };

  const signup = async (email: string) => {
    setStatus('loading');
    try {
      await signupToNewsletter(email);
      setStatus('success');
    } catch (error) {
      console.error('Failed to sign up:', error);
      setStatus('error');
    }
  };
  return (
    <>
      <div className="w-full container px-4 mx-auto relative">
        <div
          className={
            'flex flex-col md:flex-row gap-10 justify-center md:max-w-[1024px] mx-auto'
          }
        >
          <form
            className="relative md:w-1/2 md:flex-1 md:pr-4 flex-col flex gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <h3 className="text-4xl text-left lg:text-5xl font-modak mb-0">
              subscribe to become a vip
            </h3>

            <h3
              className={`mb-3 ${
                status == 'success'
                  ? 'text-green-600'
                  : status == 'error'
                  ? 'text-red-600'
                  : 'text-primary'
              }`}
            >
              {status == 'loading' && 'Loading...'}
              {status == 'success' && 'Thank you for subscribing!'}
              {status == 'error' && 'Failed to subscribe. Please try again.'}
            </h3>

            <input
              className="text-md border-primary border-4 max-w-[280px] w-full rounded-lg px-3 py-2"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <button
              className={`newsletter-form__button field__button cursor-pointer w-36 h-auto group relative block`}
              type="submit"
              // className="cursor-pointer newsletter-form__button field__button bg-primary-orange text-background px-3 py-2 rounded ml-2"
              name="commit"
              id="Subscribe"
              aria-label="Subscribe"
            >
              <img
                src="images/button.png"
                alt=""
                className="group-hover:opacity-90"
              />
              <span className="absolute left-1/2 top-1/2 text-md font-bold -translate-x-1/2 -translate-y-1/2 text-secondary z-20">
                Confirm
              </span>
            </button>
          </form>
          <div className="md:w-1/2 md:flex-1 relative mr-4 md:pl-4 md:mr-4">
            <div className="-z-1 rounded-xl w-[calc(100%-1rem)] h-full border-primary border-4 absolute left-8 top-4" />
            <img
              src="/images/subscribe.jpg"
              alt=""
              className="z-20 relative object-cover w-full h-auto pointer-events-none rounded-lg select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
