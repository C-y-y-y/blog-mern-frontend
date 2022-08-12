import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, fetchRegistration, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        // setError,
        formState: { errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegistration(values))

        if (!data.payload) {
            return alert('Registration failed')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to='/'/>
    }

    return (
    <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
            Создание аккаунта
        </Typography>

        <div className={styles.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                className={styles.field}
                label="Full name"
                type='name'
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register(
                    'fullName',
                    { required: 'Write a full name' }
                )}
                fullWidth />

            <TextField
                className={styles.field}
                label="E-Mail"
                type='email'
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register(
                    'email',
                    { required: 'Write an email' }
                )}
                fullWidth
            />

            <TextField
                className={styles.field}
                label="Password"
                type='password'
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register(
                    'password',
                    { required: 'Write a password' }
                )}
                fullWidth
            />

            <Button
                type='submit'
                size="large"
                variant="contained"
                disabled={!isValid}
                fullWidth
            >
                Registration
            </Button>
        </form>
    </Paper>
    );
};
