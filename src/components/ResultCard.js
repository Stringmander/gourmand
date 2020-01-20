import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    header_root: {
        display: 'block'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function ResultCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card} >
            <CardHeader
                title={props.title}
                titleTypographyProps={{
                    variant: 'h6',
                    noWrap: true
                }}
                className={classes.header_root}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardContent>
                <Typography varient="body2" color="textSecondary" component="p" >
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" >
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}