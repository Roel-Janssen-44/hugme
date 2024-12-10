'use server';

const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        email
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export async function signupToNewsletter(email: string) {
  const input = {
    email: email,
    password: generatePassword(),
    acceptsMarketing: true,
  };

  const response = await fetch(
    `https://c78ee0-2.myshopify.com/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Todo - replace with own storefront access token
        'X-Shopify-Storefront-Access-Token': 'a26a85b21c9808a83d2696759e14c171',
      },
      body: JSON.stringify({
        query: CREATE_CUSTOMER_MUTATION,
        variables: {input},
      }),
    },
  );

  const data = await response.json();
}

function generatePassword(length = 12) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
