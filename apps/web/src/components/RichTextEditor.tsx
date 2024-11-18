'use client'; 

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import FontSize from 'tiptap-extension-font-size';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';

const TiptapEditor = ({ value, onChange }: { value: any, onChange: any }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            FontSize,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()); 
        },
    });


    const setFontSize = (size: any) => {
        if (editor) {
            editor.chain().focus().setFontSize(size).run();
        }
    };


    return (
        <div>
            <div className="toolbar p-1 bg-gray-100 rounded-lg space-x-1 mx-auto">
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className='font-bold p-1 border rounded-lg border-black hover:bg-gray-200 focus:bg-blue-200 transition-all duration-300 ease-in-out'>Bold</button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className='font-bold p-1 border rounded-lg border-black hover:bg-gray-200 focus:bg-blue-200 transition-all duration-300 ease-in-out'>Italic</button>
                <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className='font-bold p-1 border rounded-lg border-black hover:bg-gray-200 focus:bg-blue-200 transition-all duration-300 ease-in-out'>Underline</button>
                <select onChange={(e) => setFontSize(e.target.value)} defaultValue="" className='font-bold p-1 border rounded-lg border-black hover:bg-gray-200  transition-all duration-300 ease-in-out'>
                    <option value="" disabled>Font Size</option>
                    <option value="8px">8px</option>
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                    <option value="32px">32px</option>
                </select>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
