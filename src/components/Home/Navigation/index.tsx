"use client";

import Link from "next/link";
import navigation from "./Navigation.module.scss";
import { useSession } from "next-auth/react";
import { useGetPost } from "@/hooks/useGetPost";
import useUpdatePost from "@/hooks/useUpdatePost";

export const Navigation = () => {
    const { handleInputChange } = useUpdatePost();
    const { data: session } = useSession();
    const { post } = useGetPost();

    if (!post) return <div>Loading...</div>;

    return (
        <section className={navigation.navigation}>
            <div className="container">
                <ul className={navigation.navigation__list}>
                    {!session ? (
                        post?.home[2]?.list?.map((link: any, index: number) => (
                            <li key={index} className={navigation.navigation__list_link}>
                                <Link href="#">{link.name}</Link>
                            </li>
                        ))
                    ) : (
                        post?.home[2]?.list?.map((el: any, index: number) => (
                            <input 
                                key={index} // Додайте унікальний ключ
                                type="text" 
                                className={navigation.navigation__list_input} 
                                defaultValue={el.name}
                                onChange={(event) => handleInputChange(event, 'name', 2, index)} // Використовуйте "list" і індекс
                            />
                        ))
                    )}
                </ul>
            </div>
        </section>
    );
};
