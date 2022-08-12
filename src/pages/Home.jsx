import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from "../axios";

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
    const dispatch = useDispatch()
    const { posts, tags } = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)

    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="New" />
                {/*<Tab label="Популярные" />*/}
                <p>

                </p>
            </Tabs>

            <Grid container spacing={4}>
                {(isPostsLoading
                    ? [...Array(5)]
                    : posts.items)
                .map((obj, index) => {
                    if (isPostsLoading) {
                        return <Grid xs={6} item key={index}>
                            <Post isLoading={true}/>
                        </Grid>
                    } else {
                        const tagsArr = obj?.tags?.trim().replace(/[\s,]/g, ' ').split(' ').filter(el => el.length !== 0)

                        return <Grid xs={6} item key={index}>
                            <Post
                                id={obj?._id}
                                title={obj?.title}
                                imageUrl={obj?.imageUrl}
                                user={obj?.user}
                                createdAt={obj?.createdAt}
                                viewsCount={obj?.viewsCount}
                                commentsCount={3}
                                tags={tagsArr}
                                isEditable={userData?._id === obj.user._id}
                            />
                        </Grid>
                    }
                })}

            </Grid>
        </>
    );
};
