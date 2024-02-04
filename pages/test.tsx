import { Box, Typography } from '@mui/material';

const test = () => {
  return (
    <div>
      <h1>테스트 페이지입니다.</h1>
      <Box sx={{ bgcolor: 'red' }}>Mui가 제대로 동작하는지 확인합니다.</Box>
      <Typography variant="h5">반응형도 제대로 동작하는지 확인합니다.</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: 3,
          flexDirection: { xs: 'column', sm: 'row' },

          div: {
            width: '200px',
            height: '200px',
            bgcolor: { xs: 'orange', sm: 'blue', md: 'green' },
            transition: 'all 0.5s ease-in-out',
          },
        }}
      >
        {Array.from(Array(6).keys()).map((i) => (
          <Box key={i}>{i}</Box>
        ))}
      </Box>
    </div>
  );
};
export default test;
