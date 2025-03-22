import { Box, Grid } from '@mui/material';
import styles from './styles';

/**
 * Renders a list of tabs for filtering tools by category.
 * @param {Object} props - Component props.
 * @param {string[]} props.tabs - An array of strings representing the filter categories.
 * @param {string} props.activeTab - The currently selected filter category.
 * @param {function} props.setActiveTab - Callback function triggered when a tab is clicked. Receives the selected tab as an argument.
 * @returns {JSX.Element} The rendered filters component.
 */

const Filters = (props) => {
  const { tabs, activeTab, setActiveTab } = props
  return (
    <Grid {...styles.outerGridProps}>
      {tabs.map((tab) => (
        <Grid {...styles.innerGridProps} key={tab}>
          <Box
            {...styles.boxProps(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Filters;