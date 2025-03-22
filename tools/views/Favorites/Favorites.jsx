
import { ToolsListingContainer } from '@/tools';

/**
 * Renders the favorite tools Listings component.
 
 * @param {object} props - The props object containing data, category, favorites, and toggle function.
 * @param {object} props.data  - The list of data that contains tools.
 * @param {object} props.favorites - The list of favorite tool IDs.
 * @param {function} props.handleToggleFavorite - Function to toggle a tool as favorite.
 * @param {boolean} props.loading - Whether the data is still loading
 * @return {JSX.Element} The rendered Tools Listings component.
 */

const Favorites = (props) => {
    const { data = [], loading, favorites, handleToggleFavorite} = props
    const favoriteTools = data.filter((tool) =>
        favorites.includes(tool.id)
    );
    return (
        <ToolsListingContainer
            data={favoriteTools}
            loading={loading}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            category="Favorites"
        />
    );

   
}; 



export default Favorites;