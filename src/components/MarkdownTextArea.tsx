import debounce from "@/util/debounce";
import { marked } from "marked";
import parse from "html-react-parser";
import {
  useState,
  useMemo,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface MarkdownTextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
  gap?: string;
}

const MarkdownTextArea = forwardRef<HTMLTextAreaElement, MarkdownTextAreaProps>(
  function MyInput({ children, gap = "gap-4", ...props }, ref) {
    const [markedContents, setMarkedContents] = useState<string>();

    const textareaOnChangeHandler = useMemo(
      () =>
        debounce((event: any) => {
          event.preventDefault();
          setMarkedContents(marked(event.target.value));
        }, 100),
      [],
    );

    return (
      <div className={`w-full flex-grow grid grid-cols-2 ${gap}`}>
        <div className="p-4 bg-gray-50 rounded-xl">
          <textarea
            className="resize-none p-4 w-full h-full rounded-xl bg-transparent outline-none"
            ref={ref}
            {...props}
            onChange={textareaOnChangeHandler}
          >
            {children}
          </textarea>
        </div>
        <div className="p-4 bg-white rounded-xl">
          {markedContents && parse(markedContents)}
          <h2 className="text-[30px] font-semibold"></h2>
        </div>
      </div>
    );
  },
);

export default MarkdownTextArea;
