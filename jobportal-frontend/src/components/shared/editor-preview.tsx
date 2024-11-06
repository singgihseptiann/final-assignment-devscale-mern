import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface EditorProps {
  value: string;
}

export const EditorPreview = ({ value }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill value={value} theme="bubble" readOnly />
    </div>
  );
};
