import { useParams } from "react-router-dom";
import useFetchArticle from "../hooks/useFetchArticleHook";
export function Article() {
    let { id } = useParams();
    if (id == null) return <h1>the id is invalid</h1>
    // let { article, isLoading, error } = useFetchArticle(id);
    return <div className="container">
        {id}
        {/* {isLoading?<h2>loading...</h2>:error? <h1>error</h1>: <div>{JSON.stringify(article)}</div>} */}
    </div>;
}
