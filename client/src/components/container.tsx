import { CSSProperties, ReactNode } from "react";

const Container = ({ children }: {children:ReactNode}) => {
    const padding = "2rem";
    const containerStyle: CSSProperties = {
        width: `min(1170px , calc(100% - ${padding}))`,
        margin: "0 auto",
    };

    return (
        <div style={{ ...containerStyle }} className="container">
            {children}
        </div>
    );
};

export default Container;
