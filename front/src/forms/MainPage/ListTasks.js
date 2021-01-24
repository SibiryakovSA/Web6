import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Task from "./Task";
import {AllTaskList, Filter} from "./MainForm";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 540,
        backgroundColor: theme.palette.background.paper,
        margin: "auto",
        marginTop: 10
    }
}));

export default function TaskList() {
    const classes = useStyles();
    const [completedTasks, setCompletedTasks] = React.useState([]);
    //const [tasks, setTasks] = React.useState([]);

    //const {value, setValue} = useContext(AllTaskList);
    const tasksContext = useContext(AllTaskList);
    const {tasks, setTasks} = tasksContext;

    const filterContext = useContext(Filter);
    const {filter, setFilter} = filterContext;
    //const  = React.useState(taskList);
    /*return (
        <div className={classes.root}>
            <List component="nav">
                {tasks.map( (elem, index) => {
                    return (
                        <Task name={elem} key={index}/>
                    )
                })}
            </List>
            {completedTasks.length > 0 ? <Divider /> : ""}
            <List component="nav">
                {completedTasks.map( (elem, index) => {
                    return (
                        <Task name={elem} key={index}/>
                    )
                })}
            </List>
        </div>
    );*/

    return (
        <div className={classes.root}>
            <List component="nav">
                {tasks.map((elem, index) => {
                    const value = elem.toString().toLowerCase();
                    const searchValue = filter.toLowerCase();
                    if (value.indexOf(searchValue) !== -1)
                        return (
                            <Task name={elem} key={index}/>
                        )
                })}
            </List>
        </div>
    );
}