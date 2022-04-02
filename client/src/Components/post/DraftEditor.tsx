import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Controller } from "react-hook-form";

interface ITextEditorProps {
  control: any;
  setDefaultContents: Function | null;
}

function TextEditor({ control, setDefaultContents }: ITextEditorProps) {
  const defaultValue = "";
  const getEditorState = (contents: string) => {
    const { contentBlocks, entityMap } = htmlToDraft(contents || defaultValue);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };
  if (setDefaultContents) setDefaultContents();
  return (
    <div>
      <Controller
        name="contents"
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          let defaultEditorState;
          if (defaultValue || value) {
            defaultEditorState = getEditorState(defaultValue || value);
          }
          const onInternalChange = (currentContentState: any) => {
            const html = draftToHtml(currentContentState);
            onChange(html);
          };
          return (
            <Editor
              onChange={onInternalChange}
              defaultEditorState={defaultEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="h-80 mx-10 w-full"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "remove",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                blockType: {
                  options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
                },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}
              placeholder="Write a some text.."
            />
          );
        }}
      />
    </div>
  );
}

export default TextEditor;
