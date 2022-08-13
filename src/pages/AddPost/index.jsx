import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from "../../axios";

export const AddPost = () => {
    const isAuth = useSelector(selectIsAuth)

    const { id } = useParams()

    const navigate = useNavigate()
    const [setIsLoading] = useState(false); //isLoading
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const fileRef = useRef(null)

    const idEditing = Boolean(id)

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('/upload', formData)
            setImageUrl(data.url)
        } catch (err) {
            console.warn(err)
            alert('File loading failed')
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onTextChange = useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const fields = {
                title,
                imageUrl,
                tags,
                text
            }


            const { data } = idEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)

            const _id = idEditing ? id : data._id

            navigate(`/posts/${_id}`)
        } catch (err) {
            console.warn(err)
            alert('Post loading failed')
        }
    }

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(({ data }) => {
                setTitle(data?.title)
                setText(data?.text)
                setImageUrl(data?.imageUrl)
                setTags(data?.tags)
            }).catch(err => {
                console.warn(err)
            })
        } else  {

        }
    } ,[id])

    const options = useMemo(
        () => ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Write text...',
        status: false,
        autosave: {
            enabled: true,
            delay: 1000,
        },
    }),
    [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/'/>
    }

    return (
        <Paper style={{ padding: 30 }}>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    fileRef.current.click()
                }}
            >
                Load image
            </Button>

            <input
                ref={fileRef}
                type="file"
                onChange={handleChangeFile}
                hidden
            />

            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Delete
                    </Button>
                    <img
                        className={styles.image}
                        // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                        src={`https://blog-back-mern.herokuapp.com${imageUrl}`}
                        alt="Uploaded"
                    />
                </>
            )}
            <br />
            <br />

            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Post title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />

            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Tags"
                value={tags}
                onChange={e => setTags(e.target.value)}
                fullWidth
            />

            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onTextChange}
                options={options}
            />

            <div className={styles.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {idEditing ? 'Save' : 'Publish'}
                </Button>

                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
