import { convertFromHTML, ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export let toHtml = (editorContent) => {
    const _rawContentState = convertToRaw(editorContent.getCurrentContent());
    const _html = draftToHtml(_rawContentState);
    return _html;
}


export let toEditorContent = (html) => {
    //const _contentBlocks = convertFromHTML(html);
    const _contentBlocks = htmlToDraft(html).contentBlocks;;
    const _contentState = ContentState.createFromBlockArray(_contentBlocks);
    const _editorState = EditorState.createWithContent(_contentState);
    return _editorState;
}