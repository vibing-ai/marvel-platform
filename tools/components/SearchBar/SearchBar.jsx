import { Search } from '@mui/icons-material';
import { Grid, InputAdornment, TextField } from '@mui/material';
import styles from './styles';



/**
 * Renders the SearchBar Component
 * @param {Object} props - Component props.
 * @param {function} props.onSearch - Callback function triggered when the input value changes. Receives the search query as an argument.
 * @returns {JSX.Element} The rendered search bar component.
 */

const SearchBar = (props) => {
  const { onSearch } = props
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Grid {...styles.mainGridProps}>
      <TextField
        placeholder="Search for a tool"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        {...styles.textFieldProps}
      />
    </Grid>
  );
};

export default SearchBar;