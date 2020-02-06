import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import SearchField from './SearchField';

import logo from '../assets/img/logo.svg';
import { useMediaQuery } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  title: {
    flexGrow: 1,
    display: 'inline',
    fontFamily: 'Pacifico',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    maxHeight: theme.spacing(4),
    margin: theme.spacing(0, 1),
  },
  buttonsWrapper: {
    justifySelf: 'flex-end',
    margin: theme.spacing(0, 2),
  },
  button: {
    color: theme.palette.common.white,
  },
}));


function PrimaryAppBar(props) {
  const theme = useTheme();
  const classes = useStyles();

  const matchesUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesDownXs = useMediaQuery(theme.breakpoints.down('xs'))


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar} >
          {matchesDownXs && <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>}
          {matchesUpSm && <span className={classes.logoWrapper} >
            <img src={logo} className={classes.logo} />
            <Typography variant="h6" className={classes.title}>
              Gourmand
            </Typography>
          </span>}
          <SearchField onKeyDownHandler={props.handleSearchSubmit} />
          {matchesUpSm && <span className={classes.buttonsWrapper} >
            <IconButton className={classes.button} >
              <FavoriteIcon />
            </IconButton>
            <IconButton className={classes.button} >
              <ShoppingCartIcon />
            </IconButton>
          </span>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;