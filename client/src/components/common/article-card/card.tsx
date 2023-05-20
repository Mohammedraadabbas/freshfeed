import { CSSProperties, FC } from "react";
import cssStyle from "./card.module.css";

type CardProps = {
    size: "small" | "large";
    title: string;
    category: string;
    imgSrc: string;
    style?: CSSProperties;
};

const ArticleCard: FC<CardProps> = ({
    size,
    title,
    category,
    imgSrc,
    style,
}): JSX.Element => {
    console.log(cssStyle)
    let tagStyle: CSSProperties = {
        backgroundColor: "hsla(330, 81%, 60%, 1)",
        padding: "0.5em 1em",
        fontSize: size === "large" ? "16px" : "12px",
        borderRadius: "2em",
        color: "#ffffff",
        marginBottom: "16px",
        display: "inline-block",
    };

    return (
        <div className={`${cssStyle[size]} `}>
            <div className={`${cssStyle[size + "_thumbnail"]} ${cssStyle.thumbnailHover}`}>
                <img src={imgSrc} alt="" />
            </div>
            <div className={`${cssStyle[size + "_details"]}`}>
                <span className="tag" style={tagStyle}>
                    {category}
                </span>
                <h3 className={`title`}>{title}</h3>
            </div>
        </div>
    );
};

export default ArticleCard;
