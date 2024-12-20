import AceEditor from "react-ace";
import type { Dispatch } from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

interface Props {
  value: string | undefined;
  onChange: Dispatch<string>;
  className?: string;
  readonly?: boolean;
}

const AceCustom = (props: Props) => {
  return (
    <AceEditor
      className={props.className}
      //   className="aceEditor"
      mode="json"
      theme="monokai"
      fontSize={16}
      width="100%"
      // height={props.height ?? "200px"}
      height="100%"
      style={{ borderRadius: 8, position: "relative" }}
      //   enableLiveAutocompletion={true}
      wrapEnabled={true}
      setOptions={{
        showLineNumbers: true,
        showPrintMargin: false,
        tabSize: 2,
      }}
      readOnly={props.readonly}
      value={props.value}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  );
};

export default AceCustom;
