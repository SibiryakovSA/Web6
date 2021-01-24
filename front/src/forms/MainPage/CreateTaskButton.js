import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, Typography} from "@material-ui/core";
import {AllTaskList, Filter} from "./MainForm";


const useStyles = makeStyles((theme) => ({
    createButton: {
        marginRight: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '90%'
    },
    formElem: {
        display: "block",
        marginBottom: theme.spacing(1),
    }
}));

export default function CreateTaskButton(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tasksContext = useContext(AllTaskList);
    const {tasks, setTasks} = tasksContext;
    const saveNewTask = (task) => {
        setTasks([...tasks, task]);
    }
    let taskName;

    return (
        <div className={classes.createButton}>
            <Button color="inherit" onClick={handleClickOpen}>
                Добавить
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={'sm'}
                    fullWidth
            >
                <DialogTitle id="form-dialog-title">Создание задачи</DialogTitle>
                <DialogContent className={classes.form}>
                    <TextField
                        id="outlined-basic"
                        label="Название"
                        variant="outlined"
                        autoFocus
                        className={classes.formElem}
                        fullWidth
                        onChange={(event) => {
                            taskName = event.target.value;
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Описание"
                        variant="outlined"
                        className={classes.formElem}
                        fullWidth
                    />
                    <div >
                        <Typography display={'inline'}>Выполнено: </Typography>
                        <Checkbox display={'inline'} color="primary"/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={() => {saveNewTask(taskName); handleClose();}} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}