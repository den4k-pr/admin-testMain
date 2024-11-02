"use client";

import { Games } from "@/components/Home/Games";
import { Greeting } from "@/components/Home/Greeting";
import { Navigation } from "@/components/Home/Navigation";
import { Orders } from "@/components/Home/Orders";
import { Reviews } from "@/components/Home/Reviews";
import { useGetPost } from "@/hooks/useGetPost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const { updatePost } = useUpdatePost();
  const {post} = useGetPost()

  return (
    <main>
      {session && 
      <div className="logButtons">
        <button className="mainlogButton" onClick={() => signOut()}>Log out</button>
        <button className="mainlogButton" onClick={() => updatePost(post.home)}>Save</button>
      </div>}
      <Greeting />
      <Navigation />
      <Games />
      <Reviews />
      <Orders />
    </main>
  );
}
