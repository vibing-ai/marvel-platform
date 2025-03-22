import React from 'react';
import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import styles from './styles';


/**
 * Returns a Favorite button component.
 * @param {object} props - The props object containing data, category, favorites, and toggle function.
 * @prop {bool} props.isFavorite - bool indicating whether this is a favorite tool.
 * @param {function} props.handleToggleFavorite - Function to toggle a tool as favorite.
 *
 * @return {JSX.Element} The favorite button component.
 */

const FavoriteButton = (props) => {
  const { isFavorite, onToggleFavorite }  = props
    return (
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        {...styles.buttonProps} 
      >
        {isFavorite ? (
          <Star {...styles.iconProps(isFavorite)} /> // Apply the icon styles for favorite
        ) : (
          <StarBorder {...styles.iconProps(isFavorite)} /> // Apply the icon styles for non-favorite
        )}
      </IconButton>
    );
  };

  export default FavoriteButton;