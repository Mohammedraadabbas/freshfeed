import React from "react";

const parseBlock = (block, index) => {
    switch (block.type) {
        case "header":
            const { text, level } = block.data;
            const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

            return <HeaderTag key={index}>{text}</HeaderTag>;

        case "paragraph":
            return <p key={index}>{block.data.text}</p>;
        case "image":
            return (
                <img
                    key={index}
                    src={block.data.url}
                    alt={block.data.caption}
                />
            );
        case "table":
            const isTableWithHeadings = block.data.withHeadings;
            const tableContent = block.data.content;

            if (isTableWithHeadings) {
                const [headings, ...rows] = tableContent;

                return (
                    <table key={index}>
                        <thead>
                            <tr>
                                {headings.map((heading, headingIndex) => (
                                    <th key={headingIndex}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            } else {
                return (
                    <table key={index}>
                        <tbody>
                            {tableContent.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            }
        // Add more cases for other block types as needed
        default:
            return null;
    }
};

export default parseBlock;
