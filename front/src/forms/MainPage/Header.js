import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import CreateTaskButton from "./CreateTaskButton";
import {Redirect} from "react-router-dom";
import {Filter, FilterChecked} from "./MainForm";
import {PostRequest} from "../../api/requests";
import {CheckBox} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
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
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    exitButton: {
        marginLeft: theme.spacing(2),
        color: "inherit"
    },
    filterCheckbox: {
        marginLeft: theme.spacing(1),
    }
}));

export default function SearchAppBar(props) {
    const classes = useStyles();
    const login = props.login;
    const [exit, setExit] = React.useState(false);

    const filterContext = useContext(Filter);
    const setFilter = filterContext.setFilter;
    const ChangeFilterRow = (value) => {
        setFilter(value);
    }

    const checkedContext = useContext(FilterChecked);
    const {checked, setChecked} = checkedContext;

    const ExitButtonClick = (result) => {
        if (result.status === 200)
            setExit(true);
    }

    const SendExitRequest = () => {
        PostRequest(ExitButtonClick, "auth/Logout", true);
    }

    function CheckboxClick(){
        setChecked(checked === 2 ? 0 : checked + 1);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {login}
                    </Typography>
                    <CreateTaskButton />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Поиск…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event => ChangeFilterRow(event.target.value))}
                        />
                    </div>
                    <CheckBox
                        className={classes.filterCheckbox}
                        onClick={CheckboxClick}
                        color={checked === 0 ? "disabled" : checked === 1 ? "inherit" : "action"}
                        checked={true}
                    />
                    <Button className={classes.exitButton} onClick={SendExitRequest}>
                        Выйти
                        {exit ? <Redirect to='/login'/> : ""}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}