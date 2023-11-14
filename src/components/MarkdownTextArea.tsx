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
  children?: string;
  gap?: string;
}

const MarkdownTextArea = forwardRef<HTMLTextAreaElement, MarkdownTextAreaProps>(
  ({ children, gap = "gap-4", ...props }, ref) => {
    const [markedContents, setMarkedContents] = useState<string>(
      children ? marked(children, { breaks: true }) : "",
    );

    const textareaOnChangeHandler = useMemo(
      () =>
        debounce((event: any) => {
          event.preventDefault();
          setMarkedContents(marked(event.target.value, { breaks: true }));
        }, 100),
      [],
    );

    return (
      <div className={`w-full h-full flex-grow grid grid-cols-2 ${gap}`}>
        <div className="p-4 bg-gray-50 rounded-xl overflow-auto">
          <textarea
            className="resize-none p-4 w-full h-full rounded-xl bg-transparent outline-none overflow-hidden"
            ref={ref}
            {...props}
            onChange={textareaOnChangeHandler}
          >
            {children}
          </textarea>
        </div>
        <div className="p-4 bg-white rounded-xl overflow-auto">
          {markedContents && parse(markedContents)}
          <h2 className="text-[30px] font-semibold" />
        </div>
      </div>
    );
  },
);

export default MarkdownTextArea;
