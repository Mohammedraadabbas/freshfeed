import { FC, FormEvent, MutableRefObject, useEffect, useState } from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools.";
import { ButtonStyle } from "../common/button";
import Container from "../container";

interface EditorProps {
    editorRef: MutableRefObject<EditorJS | null>;
    handleSubmit: (e: FormEvent) => Promise<void>;
}

const Editor: FC<EditorProps> = ({ editorRef, handleSubmit }) => {
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

    return (
        <Container>
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
        </Container>
    );
};

export default Editor;
