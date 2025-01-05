import { useEffect } from 'react';

import { Box, Card, Grid, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';

import AppDisabled from '@/components/AppDisabled';
import Loader from '@/components/Loader';

import Star from '@/assets/svg/Star_3.svg';
import Star2 from '@/assets/svg/Star_4.svg';
import ImageURLs from '@/assets/urls';

import styles from './styles';

import { setLoading } from '@/libs/redux/slices/authSlice';

/**
 * Renders the authentication layout component that wraps the children components
 *
 * @param {Object} props - The props object
 * @param {ReactNode} props.children - The child components to be wrapped
 * @param {boolean} props.isAuthScreen - Whether the layout is for the auth screen
 * @return {JSX.Element} The React component to be rendered
 */
const AuthLayout = (props) => {
  const { children, isAuthScreen = false } = props;

  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth);

  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const isLoading = authUser.loading;

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  const renderBgImage = () => {
    return (
      <Image
        src={ImageURLs.AuthBgImage}
        alt="auth_background_logo"
        {...styles.imageProps}
        style={{
          maxWidth: "100%"
        }} />
    );
  };

  const renderArtifacts = () => {
    return (<>
      <Box {...styles.marvelProps}>
        <Image
          {...styles.marvelImageProps}
          src={ImageURLs.MarvelAuthImg}
          alt="Marvel Image"
          style={{
            maxWidth: "100%"
          }} />
      </Box>
      <Box {...styles.greenBlobProps}>
        <Image
          {...styles.blobImageProps}
          src={ImageURLs.PurpleBlobSvg}
          alt="green_blob"
          style={{
            maxWidth: "100%"
          }} />
      </Box>
    </>);
  };

  const renderHead = () => {
    return (
      <Head>
        <title>Marvel AI</title>
      </Head>
    );
  };

  const renderCard = () => {
    return (
      <Card {...styles.mainCardProps} {...props}>
        <Box {...styles.starProps}>
          <Star />
        </Box>
        <Box {...styles.star2Props}>
          <Star2 />
        </Box>
        <Grid {...styles.innerCardGridProps}>{children}</Grid>
      </Card>
    );
  };

  if (isTabletScreen) return <AppDisabled head={renderHead()} />;

  return (
    <Grid {...styles.mainGridProps}>
      {renderHead()}
      {renderBgImage()}
      {renderArtifacts()}
      {isAuthScreen && renderCard()}
      {!isAuthScreen && children}
    </Grid>
  );
};

export default AuthLayout;
