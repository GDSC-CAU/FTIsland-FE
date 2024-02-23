import { Box, SxProps } from '@mui/material';
import { useUser } from 'src/hook/useUser';

const HighlightedText = ({
  type,
  contents,
  wordList,
  sx,
}: {
  type: 'sub' | 'main';
  contents: string;
  wordList: { vocaId: number; word: string; subWord: string }[];
  sx?: SxProps;
}) => {
  const {setWordModal, setVocaId, setVocaWord, setWordType } = useUser();
  const splitByWordList = (sentence: string, wordList: string[]) => {
    let result = [sentence];

    wordList.forEach((word) => {
      const tempResult: string[] = [];
      result.forEach((substring) => {
        const substrings = substring.split(word);
        substrings.forEach((sub, index) => {
          if (index < substrings.length - 1) {
            tempResult.push(sub);
            tempResult.push(word);
          } else {
            tempResult.push(sub);
          }
        });
      });

      result = tempResult;
    });

    return result;
  };

  const findVocaIdByWord = (wordList: { vocaId: number; word: string }[], targetWord: string) => {
    return wordList.find((word) => word.word === targetWord)?.vocaId;
  };

  const splitedContent = splitByWordList(
    contents,
    wordList.map((word) => (type === 'main' ? word.word : word.subWord)),
  );

  return (
    <Box
      sx={{
        ml: 0.5,
        wordBreak: 'break-all',
        span: {
          fontSize: { xs: '17.5px', sm: '21px' },
        },
        ...sx,
      }}
    >
      {splitedContent.map((content, index) => {
        const word = wordList.find((word) =>
          type === 'main' ? content === word.word : content === word.subWord,
        );
        if (word) {
          return (
            <span
              key={index}
              style={{ color: '#39A7FF', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => {
                // 이부분이 단어 클릭했을때 동작입니다.
                // 단어를 클릭하면 단어의 id를 리턴하는 함수에여 findVocaIdByWord(wordList, content)
                setWordModal(true);

                const vocaId = findVocaIdByWord(wordList, content);
                if(typeof vocaId === "number"){
                  setVocaId(vocaId);
                  setVocaWord(word.word);
                  setWordType(type);
                }
                console.log(findVocaIdByWord(wordList, content));
              }}
            >
              {content}
            </span>
          );
        }
        return <span key={index}>{content}</span>;
      })}
    </Box>
  );
};

export default HighlightedText;
