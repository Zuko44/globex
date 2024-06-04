export const allContacts = async () => {
  const response = await fetch('http://127.0.0.1:3000');

  const result = await response.json();
  return result;
};

export const getContact = async (name: string) => {
  const response = await fetch(`http://127.0.0.1:3000?term=${name}`);

  const result = await response.json();
  return result;
};
