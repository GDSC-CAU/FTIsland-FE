import { requestAPIWithoutToken } from './api-helper';

// main 컴포넌트에서 추가
// [POST] /voca/list : 단어장 API
export const getVocaList = async (userId: number) =>
  await requestAPIWithoutToken('POST', `/voca/list`, {
    userId,
  });

// 단어카드를 눌렀을때 호출
// [GET] /voca/description : 단어 설명 API
export const getVocaDescription = async (vocaId: number, mainLan: string, subLan: string) =>
  await requestAPIWithoutToken(
    'GET',
    `/voca/description?vocaId=${vocaId}&mainLan=${mainLan}&subLan=${subLan}`,
  );

// 단어 카드에서 삭제버튼 눌렀을때 추가
// [DELETE] /voca : 단어 삭제 API
export const deleteVoca = async (userId: number, vocaId: number) =>
  await requestAPIWithoutToken('DELETE', `/voca`, {
    userId,
    vocaId,
  });

// 완성 [POST] /voca : 단어 추가 API
export const addVoca = async (userId: number, vocaId: number) =>
  await requestAPIWithoutToken('POST', `/voca`, {
    userId,
    vocaId,
  });
