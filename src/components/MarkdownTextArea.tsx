import debounce from "@/util/debounce";
import { marked } from "marked";
import parse from "html-react-parser";
import {
  useState,
  useMemo,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
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
        debounce((event: KeyboardEvent<HTMLTextAreaElement>) => {
          event.preventDefault();
          setMarkedContents(
            marked((event.target as HTMLTextAreaElement).value, {
              breaks: true,
            }),
          );
        }, 100),
      [],
    );

    return (
      <div className={`grid h-full w-full flex-grow grid-cols-2 ${gap} `}>
        <div className="overflow-auto rounded-xl border-2 border-transparent bg-gray-50 p-4 hover:border-pink-200">
          <textarea
            className="h-full w-full resize-none overflow-hidden rounded-xl bg-transparent p-4 outline-none "
            ref={ref}
            {...props}
            onChange={textareaOnChangeHandler}
          >
            {children}
          </textarea>
        </div>
        <div className="overflow-auto rounded-xl bg-white p-4">
          {markedContents && parse(markedContents)}
        </div>
      </div>
    );
  },
);

export default MarkdownTextArea;
