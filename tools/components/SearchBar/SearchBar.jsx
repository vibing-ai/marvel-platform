import { Search } from '@mui/icons-material';
import { Grid, InputAdornment, TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Grid item xs={12} sx={{ marginBottom: '16px' }}>
      <TextField
        placeholder="Search for a tool"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            // added the position to make it to the left of the page as in the design and line up with the first filter "All"
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '& fieldset': {
              borderColor: '#9d74ff',
            },
            '&:hover fieldset': {
              borderColor: '#9d74ff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9d74ff',
            },
          },
        }}
      />
    </Grid>
  );
};

export default SearchBar;
