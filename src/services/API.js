export const getTokenAPI = async () => {
  const URL_API = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const getQuestionsAPI = async (token) => {
  const URL_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};
