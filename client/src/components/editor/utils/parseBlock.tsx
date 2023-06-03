import { OutputBlockData } from "@editorjs/editorjs";

export const parseBlock = (block:OutputBlockData, index: string): JSX.Element | null => {
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
                                {headings.map((heading: string) => (
                                    <th key={heading}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row: string[], rowIndex: number) => (
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
                            {tableContent.map((row: string[], rowIndex: number) => (
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