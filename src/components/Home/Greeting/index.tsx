"use client";

import { useSession } from "next-auth/react";
import greeting from "./Greeting.module.scss";
import { SliderGreeting } from "./SliderGreeting";
import useUpdatePost from "@/hooks/useUpdatePost";
import { useGetPost } from "@/hooks/useGetPost";

export const Greeting = () => {
  const { handleTextareaChange, textareaTitleRef, textareaSubtitleRef, handleInputChange, inputTitleRef } = useUpdatePost();
  
  const { data: session } = useSession();
  const { post } = useGetPost();

  if (!post) return <div>Loading...</div>;

  return (
    <section className={greeting.greeting}>
      <SliderGreeting />
      <div className="container">
        {!session ? (
          <>
            <h1 className={greeting.greeting_title}>{post.home[1].title}</h1>
            <p className={greeting.greeting_subTitle}>
              {post?.home[1]?.subtitle}
            </p>
            <button className={greeting.greeting_button}>{post?.home[1]?.button}</button>
          </>
        ) : (
          <>
            <textarea
              ref={textareaTitleRef}
              className={greeting.greeting_title}
              defaultValue={post?.home[1]?.title}
              onChange={(event) => handleTextareaChange(event, "title", 1)}
            />

            <textarea
              ref={textareaSubtitleRef}
              className={greeting.greeting_subTitle}
              defaultValue={post?.home[1]?.subtitle}
              onChange={(event) => handleTextareaChange(event, "subtitle", 1)}
            />

            <input 
              type="text" 
              ref={inputTitleRef}
              className={greeting.greeting_button} 
              defaultValue={post?.home[1]?.button}
              onChange={(event) => handleInputChange(event, "button", 1)}
            />
          </>
        )}
      </div>
    </section>
  );
};
