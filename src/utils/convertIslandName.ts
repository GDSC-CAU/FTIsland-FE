export const convertIslandName = (islandName: string) => {
  console.log(islandName);
  if(islandName === '기쁨'){
    return 2;
  }else if(islandName === '행복'){
    return 3;
  }else if(islandName === '용기'){
    return 4;
  }else if(islandName === '희망'){
    return 5;
  }else if(islandName === '미지'){
    return 6;
  }else {
    return 1;
  }
};