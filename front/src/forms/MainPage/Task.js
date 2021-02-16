import React, {useContext} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Button, Checkbox, Collapse, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CommentsButton from "./Comments";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import {AllTaskList} from "./MainForm";
import {DeleteRequest, PatchRequest, PostRequest} from "../../api/requests";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
        marginBottom: 5
    },
    taskButton:{
        marginLeft: theme.spacing(4) - 5
    },
    //не вышло сделать 2 класса, компонент не поддерживает :(
    textArea: {
        marginBottom: 5,
        width: "75%",
        marginLeft: theme.spacing(4),
        display: "block",

    },
    icon: {
        marginRight: theme.spacing(1),
        //color: "disabled"
    },
    taskName: {
        maxWidth: "70%"
    }

}));

function patchTaskHandler(response){
    if (response.status >= 300)
        alert('Произошла ошибка в изменении задачи');
}

function CollapsedList(props){
    const [checked, setChecked] = React.useState(props.isComplited);

    function CheckboxValueChanged(event){
        PatchRequest(patchTaskHandler, "issues/EditIssue?" +
            "issueId=" + props.id +
            "&isComplited=" + !checked,
            true);
        setChecked(!checked);
    }

    return (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <Typography variant="body1" className={props.classes.nested} display="block">
                {props.description ? "Описание: " + props.description : "Описание отсутствует"}
            </Typography>
            <div>
                <Typography display={'inline'} className={props.classes.nested}>Выполнено: </Typography>
                <Checkbox
                    display={'inline'}
                    color="primary"
                    checked={checked}
                    value={"on"}
                    onClick={CheckboxValueChanged}
                />
            </div>
            <CommentsButton id={props.id} username={props.username}/>
        </Collapse>
    );
}

function CollapsedListEditMode(props){
    const {tasks, setTasks} = props.tasks;
    let nameValue = props.name;
    let descrValue = props.description;

    function SaveButtonClick(){
        let temp = [];
        tasks.forEach((elem) => {
            if (elem.id === props.id){
                elem.issueText = descrValue;
                elem.issueName = nameValue;
            }
            temp.push(elem);

        })
        setTasks(temp);
        props.editMode(false);
        PatchRequest(patchTaskHandler, "issues/EditIssue?" +
            "issueId=" + props.id +
            "&issueName=" + nameValue +
            "&issueText=" + descrValue,
            true);
    }

    return (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <TextField
                className={props.classes.textArea}
                defaultValue={props.name}
                placeholder={"Название"}
                fullWidth
                label={"Название"}
                onChange={(event) => nameValue = event.target.value}
            />
            <TextField
                label={"Описание"}
                rowsMax={4}
                rows={2}
                multiline
                placeholder="Описание"
                className={props.classes.textArea}
                defaultValue={props.description}
                fullWidth
                onChange={(event) => descrValue = event.target.value}
            />
            <Button display={"block"} className={props.classes.taskButton} color="primary" onClick={SaveButtonClick}>Сохранить</Button>
        </Collapse>
    );
}

export default function Task(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    const tasksContext = useContext(AllTaskList);
    const {tasks, setTasks} = tasksContext;

    function deleteTaskHandler(response){
        if (response.status >= 400)
            alert('Произошла ошибка с удалением задачи');
    }
    function deleteThisTask(event){
        let temp = [];
        tasks.forEach((elem) => {
            if (elem.id !== props.id)
                temp.push(elem);
        })
        setTasks(temp);
        DeleteRequest(deleteTaskHandler, "issues/DeleteIssue?" +
            "id=" + props.id,
            true);
    }

    return (
        <div>
            <ListItem button onClick={() => {setOpen(!open);}}>
                <ListItemText primary={props.name} />
                {open ? <EditIcon
                    className={classes.icon}
                    color={"action"}
                    onClick={(event) => {
                        setEdit(!edit);
                        event.stopPropagation();
                    }}
                /> : ""}
                {open ? <DeleteOutlinedIcon
                    className={classes.icon}
                    color={"action"}
                    onClick={deleteThisTask}
                /> : ""}
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {!edit ?
                <CollapsedList {...props} classes={classes} open={open}/> :
                <CollapsedListEditMode {...props} classes={classes} open={open} tasks={{tasks, setTasks}} editMode={setEdit}/>}
        </div>
    );
}
//TODO: ошибки 401, 403, 404
//TODO: валидация данных, обработка и отображение ошибок
//TODO: всякие анимации загрузок