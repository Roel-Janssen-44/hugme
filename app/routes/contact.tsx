import Button from '~/components/Button';
import {useState, useRef} from 'react';

// export const meta: MetaFunction = () => {
//   return [{title: 'Can you hug______me, please? - Hug_me'}];
// };

export default function FeaturedCollection({}) {
  // Handle inputs
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    // checkbox: false,
  });

  const form = useRef(null);

  const [status, setStatus] = useState('');
  const [loader, setLoader] = useState(false);
  const [nameErrorValue, setNameErrorValue] = useState('');
  let nameError = true;
  const [emailErrorValue, setEmailErrorValue] = useState('');
  let emailError = true;
  const [phoneErrorValue, setPhoneErrorValue] = useState('');
  let phoneError = true;
  const [messageErrorValue, setMessageErrorValue] = useState('');
  let messageError = true;
  //   const [checkboxErrorValue, setCheckboxErrorValue] = useState("");
  //   let checkboxError = true;

  const [sendStatus, setSendStatus] = useState('');

  const handleChange = (event: any) => {
    // if (event.target.id === "checkbox") {
    //   setInputs((values) => ({ ...values, ["checkbox"]: !inputs.checkbox }));
    //   return;
    // }
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({...values, [name]: value}));
  };

  // Single inputs checks
  const handleName = () => {
    if (inputs.name === '' || inputs.name === undefined) {
      nameError = true;
      setNameErrorValue('Fill in a name');
      return;
    }
    if (inputs.name !== '') {
      nameError = false;
      setNameErrorValue('');
    }
  };
  const handleEmail = () => {
    if (inputs.email === '' || inputs.email === undefined) {
      emailError = true;
      setEmailErrorValue('Fill in an email address');
      return;
    }
    if (inputs.email !== '') {
      emailError = false;
      setEmailErrorValue('');
    }
  };
  const handlePhone = () => {
    if (inputs.phone === '' || inputs.phone === undefined) {
      phoneError = true;
      setPhoneErrorValue('Fill in a phone number');
      return;
    }
    if (inputs.phone !== '') {
      phoneError = false;
      setPhoneErrorValue('');
    }
  };
  const handleMessage = () => {
    messageError = false;
    setMessageErrorValue('');
  };
  //   const handleCheckbox = () => {
  //     if (inputs.checkbox) {
  //       checkboxError = false;
  //       setCheckboxErrorValue("");
  //       return;
  //     }
  //     setCheckboxErrorValue(
  //       "U dient akkoord te gaan met de algemene voorwaarden"
  //     );
  //   };

  const handleForm = (event: any) => {
    event.preventDefault();
    handleName();
    handleEmail();
    handlePhone();
    handleMessage();
    // handleCheckbox();
    if (
      nameError === false &&
      emailError === false &&
      phoneError === false &&
      messageError === false
      //   checkboxError === false
    ) {
      setLoader(true);
      setStatus('');
      handleSubmit(event, inputs);
    }
  };

  const handleSubmit = async (event: any, inputs: any) => {
    event.preventDefault();
    setSendStatus('Loading...');
    const data = new FormData(form.current!);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if ((res as any).success) {
          setSendStatus('Sent');
        } else {
          setSendStatus(
            'Because of a technical error, the form was not submitted. Please try again later.',
          );
        }
      });
  };

  return (
    <div className="container mx-auto px-4">
      <p
        className={`text-xl mb-10 ml-1 ${
          sendStatus === 'Sent' ? 'text-green-600' : ''
        } 
      ${sendStatus === 'Loading...' ? 'text-gray' : ''}
      ${
        sendStatus ===
        'Because of a technical error, the form was not submitted. Please try again later.'
          ? 'text-red-600'
          : ''
      }`}
      >
        {sendStatus}
      </p>
      <form ref={form}>
        <input
          type="hidden"
          name="access_key"
          value="9b13768c-5b49-42c6-86b8-571e6541ce6f"
        />
        <div className="w-full md:top-20 max-w-md mx-auto sm:max-w-none">
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:mr-[2.5%] lg:inline-block">
            <input
              onChange={handleChange}
              className="text-gray peer border-2 rounded-md border-primary py-2 px-2 mb-1 w-full placeholder-primary focus:outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className="cursor-auto sr-only font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Naam *
            </label>
            <p className="text-[red] w-full">{nameErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:ml-[2.5%] lg:inline-block">
            <input
              onChange={handleChange}
              className="text-gray peer border-2 rounded-md border-primary py-2 px-2 mb-1 w-full placeholder-primary focus:outline-none"
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
            />
            <label
              htmlFor="phone"
              className="cursor-auto sr-only font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Telefoonnummer *
            </label>
            <p className="text-[red] w-full">{phoneErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <input
              onChange={handleChange}
              className="text-gray peer border-2 rounded-md border-primary py-2 px-2 mb-1 w-full placeholder-primary focus:outline-none"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="cursor-auto sr-only font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Email *
            </label>
            <p className="text-[red] w-full">{emailErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <textarea
              onChange={handleChange}
              className="text-gray peer border-2 rounded-md border-primary py-2 px-2 mb-1 w-full placeholder-primary focus:outline-none"
              rows={3}
              id="message"
              name="message"
              placeholder="Message"
            />
            <label
              htmlFor="message"
              className="cursor-auto sr-only font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm peer-focus:font-bold"
            >
              Bericht
            </label>
            <p className="text-[red] w-full">{messageErrorValue}</p>
          </div>

          {/* <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full mb-8 -mt-4">
            <input
              className="text-blue peer border-b-2 mr-2 border-blue py-2 px-2 mb-1"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={handleChange}
            />
            <label htmlFor="checkbox" className="cursor-auto text-black">
              Ik heb de
              <a
                href="/algemene-voorwaarden"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {" "}
                Algemene voorwaarden{" "}
              </a>
              en
              <a
                href="/privacy-verklaring"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {" "}
                Privacy verklaring{" "}
              </a>
              gelezen en ga hiermee akkoord *
            </label>
            <p className="text-[red] w-full">{checkboxErrorValue}</p>
          </div> */}

          <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <Button
              handleClick={() => {
                handleForm(event);
                setLoader(false);
                setStatus('');
              }}
              className=""
            >
              Send
            </Button>
            {/* <button
              onClick={() => {
                handleForm(event);
                setLoader(false);
                setStatus('');
              }}
              type="button"
              className="group flex border-blue border-2 relative text-white p-0 rounded mt-1.5 ml-1.5"
            >
              <span
                className="block px-6 py-2 -translate-y-1.5 -translate-x-1.5 transition-all bg-blue rounded border-2 border-blue scale-[1.03]
                   group-hover:translate-y-0 group-hover:translate-x-0"
              >
                Verzenden
              </span>
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
