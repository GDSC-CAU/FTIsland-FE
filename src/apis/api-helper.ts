import axios, { AxiosError, AxiosResponse } from 'axios';

export const requestAPIWithoutToken = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  body?: object,
) =>
  await axios({
    method,
    url: process.env.NEXT_PUBLIC_SERVER_URL + url,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError<{ message: string }>) =>
      Promise.reject(error.response?.data.message ?? error.message),
    );
