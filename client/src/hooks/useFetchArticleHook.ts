import { useEffect, useState } from "react";
let accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGZkODU1MmM2ZTljM2VkYjgzYTUyMSIsImlhdCI6MTY4MzE5Nzk4NiwiZXhwIjoxNjgzMTk4ODg2fQ.Dj6WHlEn57d4Nnv8165h1_8LJNbDWwaBUIJWGVKLb7I";
const useFetchArticle = (id: string) => {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.111:3000/article/`,
                    {
                        headers: {
                            authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = await response.json();
                setArticle(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    return { article, isLoading, error };
};
export default useFetchArticle;
