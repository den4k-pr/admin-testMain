"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useGetPost } from "./useGetPost";
import { updatePost as updatePostAction } from "@/redux/state/postSlice";

const useUpdatePost = () => {
    const textareaTitleRef = useRef<HTMLTextAreaElement>(null);
    const textareaSubtitleRef = useRef<HTMLTextAreaElement>(null);
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputSubtitleRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const { post, loading, error } = useGetPost();

    const updateData = (newValue: string, field: string, sectionIndex: number) => {
        if (!post?.home[sectionIndex]) return;

        const updatedData = structuredClone(post);
        updatedData.home[sectionIndex][field] = newValue;

        for (let i = 2; i <= 4; i++) {
            if (updatedData.home[0][i]) {
                updatedData.home[0][i][field] = newValue;
            }
        }

        dispatch(updatePostAction(updatedData));
        adjustTextareaHeight(textareaTitleRef);
        adjustTextareaHeight(textareaSubtitleRef);
    };

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      field: string,
      sectionIndex: number,
      index?: number
  ) => {
      const newValue = event.target.value;
  
      if (typeof index === "number") {
          if (!post?.home[sectionIndex]?.list) return;
  
          const updatedData = structuredClone(post);
          updatedData.home[sectionIndex].list[index][field] = newValue;
  
          dispatch(updatePostAction(updatedData));
      } else {
          updateData(newValue, field, sectionIndex);
      }
  
      adjustInputWidth(inputTitleRef);
      adjustInputWidth(inputSubtitleRef);
  };
  

    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        field: string,
        sectionIndex: number
    ) => {
        const newValue = event.target.value;
        updateData(newValue, field, sectionIndex);
    };

    const createCopyPost = (index: number) => {
        if (!post) return;
        const newPost = { ...post.home[3].list?.[index] };
        if (newPost) {
            const updatedData = structuredClone(post);
            updatedData.home[3].list.push(newPost);
            dispatch(updatePostAction(updatedData));
        }
    };

    const deletePost = (index: number) => {
        if (!post) return;
        const updatedData = structuredClone(post);
        updatedData.home[3].list.splice(index, 1);
        dispatch(updatePostAction(updatedData));
    };

    const updatePost = async (homeData: any) => {
      const response = await fetch(`https://admin-test-jet.vercel.app/api/posts/6724e7815e95b723d38b7cd3`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ home: homeData }),
      });
      if (response.ok) {
          console.log('Post updated successfully:');
          window.location.reload()
      } else {
          console.error('Failed to update post:');
      }
  };
  

    const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    const adjustInputWidth = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.style.width = "auto";
            const computedStyle = getComputedStyle(ref.current);
            const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            const newWidth = ref.current.scrollWidth + padding;
            ref.current.style.width = `${newWidth}px`;
        }
    };

    return {
        handleTextareaChange,
        handleInputChange,
        textareaTitleRef,
        textareaSubtitleRef,
        inputTitleRef,
        inputSubtitleRef,
        createCopyPost,
        deletePost,
        updatePost,
        loading,
        error,
    };
};

export default useUpdatePost;
