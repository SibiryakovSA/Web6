import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import {GetRequest, PostRequest} from "../../api/requests";


//стили, добавленные мной (не с шаблона)
const useStyles = makeStyles((theme) => ({
    openDialogButton: {
        marginLeft: theme.spacing(4) - 5,
        marginBottom: 10
    },
    commentTextField: {
        margin: theme.spacing(1)
    },
    addCommentButton: {
        margin: theme.spacing(1)
    }
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CommentsButton(props) {
    const userName = props.username;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let textFieldValue;

    const AddComment = event => {
        //event.preventDefault();
        PostRequest(() => {}, "comments/AddIssueComment?" +
            "issueId=" + props.id +
            "&commentText=" + textFieldValue,
            true);
        setComments([...comments, textFieldValue]);
    };

    useEffect(() => {
        let tempComments = [];
        const GetIssueComments = (result) => {
            if (result.status === 200){
                let requestResult = JSON.parse(result.result);
                requestResult.forEach((comment) => {
                    tempComments.push(comment.commentText);
                })
                setComments(tempComments);
            }
        }
        GetRequest(GetIssueComments, "comments/GetIssueComments?issueId=" + props.id, true);
    }, []);
    const [comments, setComments] = React.useState([]);

    return (
        <div className={classes.openDialogButton}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Комментарии
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth={'md'}
                scroll={'paper'}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {userName}
                </DialogTitle>
                <DialogContent dividers>
                    {
                        comments.map( (elem, index) => {
                            return (
                                <Typography key={index}>
                                    {elem}
                                </Typography>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <TextField
                        id="outlined-basic"
                        className={classes.commentTextField}
                        label="Комментарий"
                        variant="outlined"
                        fullWidth
                        autoFocus
                        onChange={
                            (event) =>
                                textFieldValue = event.target.value
                        }
                    />
                    <Button
                        color="primary"
                        className={classes.addCommentButton}
                        onClick={AddComment}
                    >
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}