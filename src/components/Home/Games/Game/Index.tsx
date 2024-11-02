"use client";

import { useEffect, useRef, useState } from "react";
import game from "../Games.module.scss";
import useUpdatePost from "@/hooks/useUpdatePost";
import { useSession } from "next-auth/react";
import { useGetPost } from "@/hooks/useGetPost";
import { useChangeImages } from "@/hooks/useChangeImg";

export const Game = () => {
    const { post } = useGetPost();
    const { handleInputChange, createCopyPost, deletePost } = useUpdatePost();
    const { selectedImages, handleFileChange } = useChangeImages();
    
    const { data: session } = useSession();

    if (!post) return <div>Loading...</div>;

    return (
        <div className={game.game__games}>
            {!session ?  
                post?.home[3]?.list?.map((el: any, index: number) => (
                    <figure key={index} className={game.gamePart}>
                        <img className={game.gamePart__image} src="/games/game.png" alt="game" />
                        <figcaption className={game.gamePart__content}>
                            <div className={game.gamePart__content_top}>
                                <p className={game["gamePart__content_top-time"]}>{el.hours}</p>
                                <p className={game["gamePart__content_top-category"]}>TBC classic</p>
                            </div>
                            <div className={game.gamePart__content_bottom}>
                                <h3 className={game["gamePart__content_bottom-name"]}>{el.title}</h3>
                                <ul className={game["gamePart__content_bottom-list"]}>
                                    {el.features?.map((feature: any, featureIndex: number) => 
                                        <li key={featureIndex}>{feature}</li>
                                    )}
                                </ul>
                                <div className={game.gamePart__content_bottom_box}>
                                    <p className={game["gamePart__content_bottom_box-price"]}>€ {el.price}</p>
                                    <button className={game["gamePart__content_bottom_box-button"]}>{el.button}</button>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                ))
            :
                post?.home[3]?.list?.map((el: any, index: number) => (
                    <figure key={index} className={game.gamePart}>
                        <img 
                            className={game.gamePart__image} 
                            src={selectedImages[index] || el.img} // Використання масиву зображень
                            alt="game" 
                            onClick={() => document.getElementById(`file-input-${index}`)?.click()} // Натискаємо на зображення
                        />
                        <input
                            id={`file-input-${index}`} // Унікальний id для кожного input
                            onChange={(event) => handleFileChange(event, index)}
                            type="file"
                            style={{ display: "none" }} // Прихований input
                        />
                        <figcaption className={game.gamePart__content}>
                            <div className={game.gamePart__content_top}>
                                <input
                                    type="text"
                                    className={game["gamePart__content_top-time"]}
                                    defaultValue={el.hours}
                                    onChange={(event) => handleInputChange(event, "hours", 3, index)} // Передайте "hours" як поле
                                />
                                <p className={game["gamePart__content_top-category"]}>TBC classic</p>
                            </div>
                            <div className={game.gamePart__content_bottom}>
                                <input
                                    type="text"
                                    className={game["gamePart__content_bottom-name"]}
                                    defaultValue={el.title}
                                    onChange={(event) => handleInputChange(event, "title", 3, index)} // Передайте "title" як поле
                                />
                                <ul className={game["gamePart__content_bottom-list"]}>
                                    {Array.isArray(el.features) ? (
                                        el.features.map((name: any, featureIndex: number) => (
                                            <li key={featureIndex}>
                                                <input
                                                    type="text"
                                                    defaultValue={name}
                                                    onChange={(event) => handleInputChange(event, "features", 3, index)} // Передайте index
                                                />
                                            </li>
                                        ))
                                    ) : (
                                        <li>No features available</li> // Або просто нічого не відображати
                                    )}
                                </ul>
                                <div className={game.gamePart__content_bottom_box}>
                                    <p className={game["gamePart__content_bottom_box-price"]}>
                                        €<input
                                            className={game["gamePart__content_bottom_box-price"]}
                                            type="text"
                                            defaultValue={el.price}
                                            onChange={(event) => handleInputChange(event, "price", 3, index)} // Передайте "price" як поле
                                            style={{ width: "100px" }}
                                        />
                                    </p>
                                    <input
                                        type="text"
                                        className={game["gamePart__content_bottom_box-button"]}
                                        style={{ display: "block", minWidth: "125px" }}
                                        defaultValue={el.button}
                                        onChange={(event) => handleInputChange(event, "button", 3, index)} // Передайте "button" як поле
                                    />
                                </div>
                            </div>
                        </figcaption>
                        <div className={game.gamePart__buttons}>
                            <button onClick={() => createCopyPost(index)}>Copy post</button>
                            <button onClick={() => deletePost(index)}>Delete post</button>
                        </div>
                    </figure>
                ))
            }
        </div>
    );
};
