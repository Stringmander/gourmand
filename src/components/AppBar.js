import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import logo from '../assets/img/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
    fontFamily: 'Pacifico',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    gridColumn: 2,
    justifySelf: 'center',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    maxHeight: theme.spacing(4),
    margin: theme.spacing(0, 2),
  },
  buttonsWrapper: {
    justifySelf: 'flex-end',
    margin: theme.spacing(0, 2),
  },
  button: {
    color: theme.palette.common.white,
  },
}));


export default function PrimaryAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar} >
          <span className={classes.logoWrapper} >
            <img src={logo} className={classes.logo} />
            <Typography variant="h5" className={classes.title}>
              Gourmand
            </Typography>
          </span>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={props.handleSearchSubmit}
            />
          </div>
          <span className={classes.buttonsWrapper} >
            <IconButton className={classes.button} >
              <FavoriteIcon />
            </IconButton>
            <IconButton className={classes.button} >
              <ShoppingCartIcon />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}