import React from 'react';
import StartImage from '../../assets/images/start road.jpg'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    media: {
        height: 240,
    },
}));

function NoStoreYet(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={StartImage}
                title="Painted arrow pointing up"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Create a new store to get started
                    </Typography>
            </CardContent>
        </Card>
    );
}

export default NoStoreYet