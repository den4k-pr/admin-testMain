// src/hooks/useGetPost.ts
import { fetchPost } from "@/redux/state/postSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetPost = () => {
    const dispatch = useDispatch();
    const post = useSelector((state: any) => state.post.post);
    const loading = useSelector((state: any) => state.post.loading);
    const error = useSelector((state: any) => state.post.error);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPost());
    }, [dispatch]);

    console.log(post?.home)

    return { post, loading, error };
};
