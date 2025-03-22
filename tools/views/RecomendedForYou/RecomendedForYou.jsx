  
import { ToolsListingContainer } from '@/tools';

/**
 * Renders the recommneded tools Listings component.
 *
 * @param {object} props - The props object containing data, category, favorites, and toggle function.
 * @param {object} props.data  - The list of data that contains tools.
 * @param {object} props.favorites - The list of favorite tool IDs.
 * @param {function} props.handleToggleFavorite - Function to toggle a tool as favorite.
 * @param {boolean} props.loading - Whether the data is still loading
 * @return {JSX.Element} The rendered Tools Listings component.
 */

const RecomendedForYou = (props) => {
    const { data = [], loading, toolsFrequency, favorites, handleToggleFavorite } = props
     // Function to extract top tools based on frequency
    const getTopTools = (toolsFrequency, data, limit = 4) => {
        
        
        const topToolIds = Object.entries(toolsFrequency)
        .sort(([, freqA], [, freqB]) => freqB - freqA)
        .slice(0, limit)
        .map(([toolId]) => toolId);
        
        return data.filter((tool) => topToolIds.includes(tool.id));
    };
    
   const recommendTools = getTopTools(toolsFrequency, data);



    return (
        <ToolsListingContainer
            data={recommendTools}
            loading={loading}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            category="Recommended For You"
        />
    );

   
}; 

export default  RecomendedForYou ;