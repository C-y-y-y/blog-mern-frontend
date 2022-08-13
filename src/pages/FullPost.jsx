import React, {useEffect, useState} from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

export const FullPost = () => {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    if (loading) {
        return <Post isLoading={loading} isFullPost/>
    }

    const tagsArr = data?.tags?.trim().replace(/[\s,]/g, ' ').split(' ').filter(el => el.length !== 0)

    return (
        <>
            <Post
                id={data?._id}
                title={data?.title}
                imageUrl={data?.imageUrl}
                user={data?.user}
                createdAt={data?.createdAt}
                viewsCount={data?.viewsCount}
                commentsCount={3}
                tags={tagsArr}
                isFullPost
            >
                <ReactMarkdown children={data?.text}/>
            </Post>

            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Alex",
                            avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
                        },
                        text: "You should set the prop to align the avatar at the top",
                    },
                    {
                        user: {
                            fullName: "Nata",
                            avatarUrl: "https://cdn-icons-png.flaticon.com/512/168/168734.png",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
