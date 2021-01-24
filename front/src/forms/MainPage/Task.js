import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Checkbox, Collapse, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CommentsButton from "./Comments";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
        marginBottom: 5
    },
    taskButton:{
        marginLeft: theme.spacing(4) - 5
    }

}));

export default function Task(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <ListItem button onClick={() => {setOpen(!open)}}>
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Typography variant="body1" className={classes.nested} display="block">
                    {props.description ? "Описание: " + props.description : "Описание отсутствует"}
                </Typography>
                <div display="block">
                    <Typography display={'inline'} className={classes.nested}>Выполнено: </Typography>
                    <Checkbox display={'inline'} color="primary"/>
                </div>
                <CommentsButton />
            </Collapse>
        </div>
    );
}