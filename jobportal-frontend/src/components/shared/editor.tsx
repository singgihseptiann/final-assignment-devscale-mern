import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, placeholder = 'Enter something', onChange }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill placeholder={placeholder} value={value} onChange={onChange} theme="snow" />
    </div>
  );
};
