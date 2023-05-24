import { ArticleCard } from "../common/article-card";
import style from "./ArticleGrid.module.css";

export const ArticleGrid = () => {
    return (
        <section>
            <div className="container">
                <div className={`${style.grid}`}>
                    <ArticleCard
                        size="large"
                        title="Exploring the Benefits and Drawbacks of Remote Work: A Comprehensive Analysis"
                        category="Design"
                        imgSrc="/heading-img-3.jpg"
                    />
                    <ArticleCard
                        size="large"
                        title="Exploring the Benefits and Drawbacks of Remote Work: A Comprehensive Analysis"
                        category="Design"
                        imgSrc="/heading-img-3.jpg"
                    />
                    <ArticleCard
                        size="large"
                        title="Exploring the Benefits and Drawbacks of Remote Work: A Comprehensive Analysis"
                        category="Design"
                        imgSrc="/heading-img-3.jpg"
                    />
                </div>
            </div>
        </section>
    );
};
