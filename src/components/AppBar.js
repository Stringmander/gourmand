import React, { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
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
import SearchDrawer from './SearchDrawer';

import logo from '../assets/img/logo.svg';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
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
  searchButton: {
    marginLeft: theme.spacing(2),
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    maxHeight: theme.spacing(4),
    margin: theme.spacing(0, 1),
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonsWrapper: {
    justifySelf: 'flex-end',
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0, 0, 2)
    },
  },
}));

function PrimaryAppBar({ handleSearchSubmit }) {
  const theme = useTheme();
  const classes = useStyles();
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false)

  const matchesUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesDownXs = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar} >
            {matchesDownXs && <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>}
            <span className={classes.logoWrapper} >
              <img src={logo} className={classes.logo} />
              <Typography variant="h6" className={classes.title}>
                Gourmand
            </Typography>
            </span>
            {matchesUpSm && <SearchField onKeyDownHandler={handleSearchSubmit} />}
            {matchesDownXs && <IconButton
              className={classes.searchButton}
              color="inherit"
              onClick={() => setSearchDrawerOpen(true)}
            >
              <SearchIcon />
            </IconButton>}
            {matchesUpSm && <span className={classes.buttonsWrapper} >
              <IconButton color="inherit" >
                <FavoriteIcon />
              </IconButton>
              <IconButton color="inherit" >
                <ShoppingCartIcon />
              </IconButton>
            </span>}
          </Toolbar>
        </AppBar>
      </div>
      <SearchDrawer
        open={searchDrawerOpen}
        setOpen={setSearchDrawerOpen}
        handleSearchSubmit={handleSearchSubmit}
      />
    </>
  );
}

export default PrimaryAppBar;