import { FormEvent, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools.";
import { ButtonStyle } from "../common/button";
import edjsParser from "editorjs-parser";
const parser = new edjsParser();
import parseBlock from "./uitils/parseBlock";

const Editor = () => {
    const editorRef = useRef<typeof EditorJS | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [preview, setPreview] = useState<JSX.Element>();

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                placeholder: "Let`s write an awesome story!",
                holder: "editor",
                tools: { ...EDITOR_JS_TOOLS },
                autofocus: true,
            });
        }

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { blocks } = await editorRef.current?.save();
        console.log(blocks);
        setPreview(blocks.map((block: any) => parseBlock(block, block.id)))
        setIsPreview(true)
    };

    return (
        <div className="container">
            {!isPreview ? (
                <form action="" onSubmit={handleSubmit}>
                    <div id="editor"></div>
                    <button
                        className={`${ButtonStyle.button} ${ButtonStyle.Primary}`}
                        style={{
                            position: "fixed",
                            right: "10%",
                            bottom: "10%",
                            zIndex: "99999999999",
                        }}
                    >
                        submit
                    </button>
                </form>
            ) : (
                <div> {preview}</div>
            )}
        </div>
    );
};

export default Editor;
