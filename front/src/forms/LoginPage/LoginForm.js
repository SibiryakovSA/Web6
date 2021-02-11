import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom";
import {GetRequest, PostRequest} from "../../api/requests";
import CryptoJs from "crypto-js"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Веб Лаба6 ПГНИУ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const classes = useStyles();
    const [registerMode, setRegisterMode] = useState(false);
    const [login, setLogin] = useState(false);
    let loginFieldValue, passFieldValue;

    function ButtonClick() {
        if (loginFieldValue === "" || passFieldValue === "")
            alert("Пожалуйста, заполните все поля");
        else {
            const md5Pass = CryptoJs.MD5(passFieldValue);
            if (!registerMode)
                GetRequest(TryLogin,
                    "auth/Login?" +
                    "username=" + loginFieldValue +
                    "&pass=" + md5Pass.toString(),
                    true);
            else
                PostRequest(TryLogin,
                    "auth/Registr?" +
                    "username=" + loginFieldValue +
                    "&pass=" + md5Pass,
                    true);
        }
    }

    function TryLogin(result){
        if (result.status === 200)
            setLogin(true);
        else alert("Неверная комбинация логина и пароля");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {registerMode ? "Регистрация" : "Вход"}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email адрес"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) =>{
                            loginFieldValue = event.target.value;
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) =>{
                            passFieldValue = event.target.value;
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => ButtonClick()}
                    >
                        {registerMode ? "Зарегистрироваться" : "Войти"}
                        {login ? <Redirect to='/tasks'/>:""}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                variant="body2"
                                onClick={ () => {setRegisterMode(!registerMode)}}
                            >
                                {!registerMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}