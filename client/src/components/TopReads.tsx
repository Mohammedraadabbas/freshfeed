import { ArticleCard } from "./common/article-card";

const TopReads = (): JSX.Element => {
    return (
        <section className="top-reads">
            <div className="container">
                <h2>
                    The Articles That Are Making Waves
                    <br /> on{" "}
                    <span>
                        FreshFeed <img src="/top-reads.svg" />
                    </span>
                </h2>
                <div className="articles-grid">
                    <div className="col">
                        <ArticleCard
                            size="large"
                            title="Exploring the Benefits and Drawbacks of Remote Work: A Comprehensive Analysis"
                            category="Design"
                            imgSrc="/heading-img-3.jpg"
                        />
                    </div>
                    <div className="col">
                        <ArticleCard
                            size="small"
                            title="Unlocking the Power of Mindfulness: Techniques for Practicing"
                            category="Design"
                            imgSrc="/heading-img-1.jpg"
                            style={{
                                borderBottom:
                                    "2px solid hsl(243deg 39% 11% / 12%)",
                            }}
                        />
                        <ArticleCard
                            size="small"
                            title="hello world"
                            category="Design"
                            imgSrc="/heading-img-2.jpg"
                            style={{
                                borderBottom:
                                    "2px solid hsl(243deg 39% 11% / 12%)",
                            }}
                        />
                        <ArticleCard
                            size="small"
                            title="hello world"
                            category="Design"
                            imgSrc="/heading-img-3.jpg"
                            // style={{gridArea: "1 / 2 / 2 / 3"}}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopReads;
