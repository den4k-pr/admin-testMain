"use client"

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import header from "../Layout.module.scss";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";
import { useSession } from "next-auth/react";
import useUpdatePost from "@/hooks/useUpdatePost";
import { useGetPost } from "@/hooks/useGetPost";
import { useChangeImg } from "@/hooks/useChangeImg";

export const Header = () => {
    const [scrollClass, setScrollClass] = useState(false);
    
    
    const { data: session } = useSession();
    
    // @ts-ignore
    const { selectedImage, handleImageClick, handleFileChange, fileInputRef } = useChangeImg();

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setScrollClass(scrollPosition >= 70);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const {post} = useGetPost()

    if (!post) return <div>Loading...</div>;


    return (
        <header style={{ backgroundColor: scrollClass ? "#181818" : "rgba(20, 20, 20, 0.12)" }} className={header.header}>
            <div className={cn("container", header.wrapper)}>
                <nav className={header.header__left}>
                    {!session ? (
                        <Link href="/" className={header.header__left_logo}>               
                            <img src={post?.home[0].logo} alt="logo" style={{ width: "54px", height: "39px" }} />                        
                        </Link>
                    ) : (
                        <>
                            <img 
                                onClick={handleImageClick} 
                                src={selectedImage === undefined ? post?.home[0].logo : selectedImage} // Відобразіть попередній перегляд або початкове зображення
                                alt="logo" 
                                style={{ width: "54px", height: "39px", objectFit: "cover" }}
                            />
                            <input
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                type="file"
                                style={{ display: "none" }} // Сховати input
                            />
                        </>
                    )}
                    <ul className={header.header__left_list}>
                        {post?.home[0].list?.map((li: any, index: any) => (
                            <li key={index}>
                                <Link href={li.href} className={header.header__left_list_link}>
                                    {li.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                
                {/* ... інші елементи навігації ... */}
            </div>
        </header>
    );
};
