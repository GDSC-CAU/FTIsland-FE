import { requestAPIWithoutToken } from './api-helper';

// 비회원일때 userId -1 보내기

// 완성 [POST] /book/explore : 동화 마지막으로 읽은 정보 가져오기 API
export const getLastReadBook = async (userId: number, bookId: number) =>
  await requestAPIWithoutToken('POST', `/book/explore`, {
    userId,
    bookId,
  });

// 동화페이지에 추가
// 완성 [GET] /book/info : 동화 정보 API
export const getBookInfo = async (bookId: number) =>
  await requestAPIWithoutToken('GET', `/book/info?bookId=${bookId}`);

// 동화페이지에 추가
// 완성 [POST] /book/content : 동화 내용 API
export const getBookContent = async (bookId: number, mainLan: string, subLan: string) =>
  await requestAPIWithoutToken('POST', `/book/content`, {
    bookId,
    mainLan,
    subLan,
  });

// [PUT] 완성 /book/last-page : 마지막으로 읽은 페이지 수정 API
export const updateLastPage = async (
  userId: number,
  bookId: number,
  offset: number,
  limitNum: number,
) =>
  await requestAPIWithoutToken('PUT', `/book/last-page`, {
    userId,
    bookId,
    offset,
    limitNum,
  });

// 완성 [POST] /book/quiz : 생각해보기 문제 생성 API
// 6초 걸림
export const createQuiz = async (userId: number, bookId: number, mainLan: string, subLan: string) =>
  await requestAPIWithoutToken('POST', `/book/quiz`, {
    userId,
    bookId,
    mainLan,
    subLan,
  });

// 메인 탭, 사이드메뉴 탭에 적용
// 완성 [POST] /book/recent-books : 최근 읽은 동화들 정보 API
export const getRecentBookListInfo = async (userId: number) =>
  await requestAPIWithoutToken('POST', `/book/recent-books`, {
    userId,
  });
