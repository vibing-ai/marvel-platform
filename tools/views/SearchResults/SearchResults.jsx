import { ToolsListingContainer } from '@/tools';

/**
 * Renders the tools Listings component that matches with the search query.
 *
 * @param {object} props - The props object containing data, category, favorites, and toggle function.
 * @param {object} props.data  - The list of data that contains tools.
 * @param {object} props.searchQuery - The search query 
 * @param {object} props.favorites - The list of favorite tool IDs.
 * @param {function} props.handleToggleFavorite - Function to toggle a tool as favorite.
 * @param {boolean} props.loading - Whether the data is still loading
 * @return {JSX.Element} The rendered Tools Listings component.
 */

const SearchResults = (props) => {
    const { data = [], loading, searchQuery, favorites, handleToggleFavorite} = props
    const searchTools = data.filter((tool) => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(lowerQuery) ||
          tool.description.toLowerCase().includes(lowerQuery)
        );
      });


    return (
        <ToolsListingContainer
            data={searchTools}
            loading={loading}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            category="Search Results"
        />
    );


}; 

export default  SearchResults ;