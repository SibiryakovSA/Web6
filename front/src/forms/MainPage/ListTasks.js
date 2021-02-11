import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Task from "./Task";
import {AllTaskList, Filter, FilterChecked} from "./MainForm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 540,
        backgroundColor: theme.palette.background.paper,
        margin: "auto",
        marginTop: 10
    }
}));

export default function TaskList(props) {
    const classes = useStyles();

    const tasksContext = useContext(AllTaskList);
    const tasks = tasksContext.tasks;

    const filterContext = useContext(Filter);
    const filter = filterContext.filter;

    const checkedContext = useContext(FilterChecked);
    const checked = checkedContext.checked;

    return (
        <div className={classes.root}>
            <List component="nav">
                {tasks.map((elem, index) => {
                    const value = elem.issueName.toString().toLowerCase();
                    const searchValue = filter.toLowerCase();
                    let checkedControl = false;

                    switch (checked) {
                        case 0:
                            checkedControl = true;
                            break;
                        case 1:
                            checkedControl = elem.isComplited;
                            break;
                        case 2:
                            checkedControl = !elem.isComplited;
                            break;
                    }

                    if (value.indexOf(searchValue) !== -1 && checkedControl)
                        return (
                            <Task
                                name={elem.issueName}
                                description={elem.issueText}
                                isComplited={elem.isComplited}
                                key={index}
                                id={elem.id}
                                username={props.username}
                            />
                        )
                    return "";
                })}
            </List>
        </div>
    );
}