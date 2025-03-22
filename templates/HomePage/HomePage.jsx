import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { debounce } from "lodash";
import ImageURLs from "@/assets/urls";
import styles from "./styles";

import { firestore } from "@/libs/redux/store";
import { updateUserFavorite} from '@/libs/redux/thunks/user'

import { ToolsListingContainer } from "@/tools";
import Filters from "@/tools/components/Filters";
import SearchBar from "@/tools/components/SearchBar";
import SortDropdown from "@/tools/components/SortDropdown";
import Favorites from "@/tools/views/Favorites";
import RecomendedForYou from "@/tools/views/RecomendedForYou";
import SearchResults from "@/tools/views/SearchResults";


const TABS = [
  "All",
  "New",
  "Planning",
  "Assessments",
  "Assignments",
  "Writing",
  "Study",
];

const HomePage = ({ data: unsortedData, loading }) => {
  const [currentTab, setCurrentTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Most Popular");
  const [favorites, setFavorites] = useState([]);
  const [toolsFrequency, setToolsFrequency] = useState([]);

  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handleToggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(id);
      dispatch(
        updateUserFavorite({
          firestore, 
          favoritesId: id,
          command: isFavorite ? "remove" : "add" 
        })
      );
      return isFavorite
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];
    });
  };

  useEffect(() => {
    if (user?.data) {
      setFavorites(user.data.favoriteToolsId || []);
      setToolsFrequency(user.data.toolsFrequency || []);
    }
  }, [user]);

  const data = [...(unsortedData || [])].sort((a, b) => a.id - b.id);

  const sortedData = data.sort((a, b) => {
    if (sortOption === "A-Z") return a.name.localeCompare(b.name);
    if (sortOption === "Z-A") return b.name.localeCompare(a.name);
    if (sortOption === "Most Popular") return b.popularity - a.popularity;
    if (sortOption === "Recently Added")
      return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  const filteredTools = sortedData.filter((tool) => {
    return currentTab === "All" || tool.category.includes(currentTab);
  });

  // Welcome Banner
  const renderWelcomeBanner = () => (
    <Grid {...styles.bannerGridProps}>
      <Image
        src={ImageURLs.WelcomeBannerImg}
        alt="welcome_banner_img"
        {...styles.image1Props}
      />
      <Grid>
        <Typography {...styles.titleProps}>
          Hello! Welcome to Marvel AI Tools. 👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for educators. Hello! I&apos;m Marvel AI, your AI teaching
          assistant. We are here to support you on your journey as a teacher,
          mentor, and more!
        </Typography>
      </Grid>
    </Grid>
  );

  const renderFilters = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerContainerGridProps}>
        <Grid item>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item>
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </Grid>
      </Grid>
      <Grid item {...styles.filtersGridProps}>
        <Filters
          tabs={TABS}
          activeTab={currentTab}
          setActiveTab={setCurrentTab}
        />
      </Grid>
    </Grid>
  );

  // Render the appropriate ToolsListingContainer if search query is empty
  const renderDefaultTools = () => {
    if (currentTab !== "All" && currentTab !== "") {
      return (
        <ToolsListingContainer
          data={filteredTools}
          loading={loading}
          favorites={favorites}
          handleToggleFavorite={handleToggleFavorite}
          category={currentTab}
        />
      );
    }
    else {
      return (
        <>
          <Favorites
            data={filteredTools}
            loading={loading}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
          />
          <RecomendedForYou
            data={filteredTools}
            loading={loading}
            toolsFrequency={toolsFrequency}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            category="Recommended For You"
          />
          <ToolsListingContainer
            data={filteredTools}
            loading={loading}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            category="All Tools"
          />
        </>
      );
    }
  }

  return (
    <Grid {...styles.mainGridProps}>
      {renderWelcomeBanner()}
      {renderFilters()}

      {searchQuery ? (
        // Render search results if searchQuery is not empty
        <SearchResults
          data={filteredTools}
          loading={loading}
          searchQuery={searchQuery}
          favorites={favorites}
          handleToggleFavorite={handleToggleFavorite}
          category="All Tools"
        />
      ) : (
        // Render other components if searchQuery is empty
        renderDefaultTools()
      )}
    </Grid>
  );
};

export default HomePage;