import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

function DraftEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const editorToHtml = draftToHtml(rawContentState);
  console.log(editorToHtml);
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      ></Editor>
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </div>
  );
}

export default DraftEditor;
