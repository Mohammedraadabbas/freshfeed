import { FormEvent, ReactNode, useRef, useState } from "react";
import { Editor } from "../components/editor";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { parseBlock } from "../components/editor/utils/parseBlock";


const NewArticle = () => {
    let editorRef = useRef<EditorJS | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [preview, setPreview] = useState<ReactNode>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const output = await editorRef.current?.save();
        const blocks: OutputBlockData<string, any>[] = output?.blocks!;
        console.log(blocks);
        setPreview(blocks.map((block: any) => parseBlock(block, block.id)))
        setIsPreview(true)
    };
    return <Editor editorRef={editorRef} handleSubmit={handleSubmit}/>;
};

export default NewArticle;
