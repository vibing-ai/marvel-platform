import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './styles';

/**
 * Renders a dropdown menu to sort items based on various criteria.
 * @param {Object} props - Component props.
 * @param {string} props.sortOption - The currently selected sorting option.
 * @param {function} props.setSortOption - Callback function triggered when the sorting option changes. Receives the selected option as an argument.
 * @returns {JSX.Element} The rendered sort dropdown component.
 */ 

const SortDropdown = (props) => {
  const { sortOption, setSortOption } = props
  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <FormControl {...styles.formControlProps}>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        value={sortOption}
        onChange={handleChange}
        label="Sort By"
        sx={styles.selectProps}
      >
        <MenuItem value="Most Popular">Most Popular</MenuItem>
        <MenuItem value="Recently Added">Recently Added</MenuItem>
        <MenuItem value="A-Z">A-Z</MenuItem>
        <MenuItem value="Z-A">Z-A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;