import { Avatar, Button, Grid, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import ChatIcon from '@/assets/svg/ChatIcon.svg';
// import DiscoveryIcon from '@/assets/svg/DiscoveryIcon.svg';
import HomeIcon from '@/assets/svg/HomeMenuIcon.svg';
import LogoutIcon from '@/assets/svg/LogoutIcon.svg';

import styles from './styles';

import ROUTES from '@/libs/constants/routes';

import { auth } from '@/libs/redux/store';
import { chatRegex, discoveryRegex, homeRegex } from '@/libs/regex/routes';

// TODO: Once Discovery Feature is ready, uncomment Discovery Page from below array.
const PAGES = [
  {
    name: 'Home',
    link: ROUTES.HOME,
    icon: <HomeIcon />,
    id: 'home',
  },
  /* {
    name: 'Discovery',
    link: ROUTES.DISCOVERY,
    icon: <DiscoveryIcon />,
    id: 'discovery',
  }, */
  // {
  //   name: 'Chat',
  //   link: ROUTES.CHAT,
  //   icon: <ChatIcon />,
  //   id: 'chat',
  // },
];

/**
 * NavBar component renders the main navigation bar for the application.
 * It includes the application logo, a navigation menu with dynamic active states,
 * and a user profile section with the ability to sign out.
 *
 * @component
 * @returns {JSX.Element} The navigation bar component.
 */
const NavBar = () => {
  const router = useRouter();

  const user = useSelector((state) => state.user.data);

  /**
   * Signs out the currently signed-in user from Firebase Authentication
   * and redirects them to the sign-in page.
   *
   * @returns {void}
   */
  const handleSignOutUser = () => {
    signOut(auth);
  };

  /**
   * Renders the logo of the application in the navbar.
   * Clicking on the logo redirects the user to the home page.
   *
   * @returns {JSX.Element} The JSX element representing the logo section.
   */
  const renderLogo = () => {
    return (
      <Grid {...styles.logoGridProps}>
        <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoImage}>
          {/* TODO: Put Marvel AI logo here */}
          <Typography {...styles.logoText}>Marvel AI</Typography>
        </Grid>
        <Typography {...styles.title}>AI Teaching Assistant</Typography>
      </Grid>
    );
  };

  /**
   * Renders the profile section of the navbar, which includes the user's profile
   * photo, name, and a logout button.
   *
   * @returns {JSX.Element} The profile section of the navbar.
   */
  const renderProfile = () => {
    return (
      <Grid {...styles.profile}>
        <Grid {...styles.userContainer}>
          <Avatar src={user?.profilePhotoUrl} {...styles.userProfile}>
            {user?.fullName[0]}
          </Avatar>
          <Typography {...styles.userName}>{user?.fullName}</Typography>
        </Grid>
        <Button startIcon={<LogoutIcon />} onClick={handleSignOutUser} />
      </Grid>
    );
  };

  /**
   * Renders the navigation menu with dynamically set active states based on the current route.
   *
   * This function generates a grid-based navigation menu where each item reflects the current route's
   * state. It highlights the active menu item and provides functionality to navigate to different routes
   * when an item is clicked.
   *
   * @returns {JSX.Element} The navigation menu component with active states and clickable items.
   */
  const renderNavMenu = () => {
    const { pathname } = router;

    /**
     * Determines if a given menu item should be highlighted as active.
     *
     * @param {string} id - The identifier of the menu item to check.
     * @returns {boolean} True if the menu item should be highlighted as active, otherwise false.
     */
    const setActive = (id) => {
      const isNotHomePage = [
        chatRegex.test(pathname) || discoveryRegex.test(pathname),
      ].includes(true);

      if (id === 'home')
        return isNotHomePage ? false : homeRegex.test(pathname);

      // TODO: Once Discovery Feature is ready, uncomment below statement.
      // if (id === 'discovery') return discoveryRegex.test(pathname);

      if (id === 'chat') return chatRegex.test(pathname);

      return false;
    };

    /**
     * Navigates to a specified route.
     *
     * @param {string} link - The route to navigate to.
     * @returns {void}
     */
    const handleRoute = (link) => {
      router.push(link);
    };

    return (
      <Grid {...styles.navMenu}>
        {PAGES.map((page) => (
          <Grid
            key={page.id}
            onClick={() => handleRoute(page.link, page.id)}
            {...styles.navMenuItem(setActive(page.id))}
          >
            <Grid {...styles.navMenuIcon}>{page.icon}</Grid>
            <Typography {...styles.navMenuText}>{page.name}</Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGrid}>
      {renderLogo()}
      {renderNavMenu()}
      {renderProfile()}
    </Grid>
  );
};

export default NavBar;
