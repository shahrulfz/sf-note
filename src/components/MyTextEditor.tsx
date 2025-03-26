import { useRef, useState, ChangeEvent } from "react";

interface TextEditorProps {
  value: string;
  isClick: boolean;
  onChange: (value: string) => void;
}

export default function MyTextEditor({
  isClick,
  value,
  onChange,
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [color, setColor] = useState<string>("#000000");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      {isClick && (
        <div className="mb-2 flex space-x-2 pb-2">
          <button
            className={`w-10 px-3 py-1 rounded cursor-pointer transition text-center ${
              isBold ? "bg-gray-400" : "hover:bg-gray-200"
            }`}
            onClick={() => setIsBold((prev) => !prev)}
          >
            B
          </button>
          <button
            className={`w-10 px-3 py-1 rounded cursor-pointer transition text-center ${
              isItalic ? "bg-gray-400" : "hover:bg-gray-200"
            }`}
            onClick={() => setIsItalic((prev) => !prev)}
          >
            I
          </button>
          <input
            type="number"
            className="w-14 p-1 rounded border border-gray-300 text-center"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
          <input
            type="color"
            className="w-10 h-10 rounded border border-gray-300"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      )}

      <div
        className="w-full py-2 outline-none"
        style={{
          fontSize: `${fontSize}px`,
          color,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "normal",
        }}
      >
        <textarea
          ref={textareaRef}
          name="note"
          placeholder="Write a note"
          className="w-full outline-none resize-none overflow-hidden bg-transparent"
          aria-label="Note input"
          value={value}
          onChange={handleChange}
          rows={1}
          style={{
            fontSize: `${fontSize}px`,
            color,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
          }}
        />
      </div>
    </div>
  );
}
