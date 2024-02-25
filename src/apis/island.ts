import axios from 'axios';
import { requestAPIWithoutToken } from './api-helper';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getIslandInfo = async (islandId: number, userId: string | number) =>
  await requestAPIWithoutToken('POST', `/island/books`, {
    islandId,
    userId,
  });

export const getBookDetail = async (id: string | number) => {
  try {
    const url = baseURL + `/book/info?bookId=${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
