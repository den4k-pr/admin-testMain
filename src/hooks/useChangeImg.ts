import { useRef, useState } from "react";
import useUpdatePost from "./useUpdatePost";

export const useChangeImages = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { handleInputChange } = useUpdatePost();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event?.target?.files?.[0];
        if (file) {
            setLoading(true);
            setError(null);

            try {
                const base64Image = await convertToBase64(file);
                const newSelectedImages = [...selectedImages];
                newSelectedImages[index] = base64Image; // Зберігаємо зображення для конкретного індексу
                setSelectedImages(newSelectedImages);

                // @ts-ignore
                handleInputChange({ target: { value: base64Image } }, "img", 3, index);

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return { selectedImages, handleFileChange, loading, error };
};



export const useChangeImg = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { handleInputChange } = useUpdatePost();

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLoading(true);
            setError(null);

            try {
                const base64Image = await convertToBase64(file);
                setSelectedImage(base64Image);
                
                // @ts-ignore
                handleInputChange({ target: { value: base64Image } }, "logo", 0)

            } catch (err) {
                setError((err as Error).message); // @ts-ignore
            } finally {
                setLoading(false);
            }
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string); // Повертаємо базове64
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return { selectedImage, handleImageClick, handleFileChange, fileInputRef, loading, error };
};
