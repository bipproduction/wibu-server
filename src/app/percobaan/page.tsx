/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Editor from "@monaco-editor/react";
import dedent from "dedent";
import { useRef } from "react";

const MonacoEditorWithButton = () => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const model = editor.getModel();
    const decorations: string[] = [];

    // Cleanup decorations before adding new ones
    const updateDecorations = () => {
      const matches: {
        line: number;
        startColumn: number;
        endColumn: number;
        name: string;
      }[] = [];

      const lineCount = model.getLineCount();
      for (let line = 1; line <= lineCount; line++) {
        const lineContent = model.getLineContent(line);
        const match = /- name: (\w+)/.exec(lineContent);
        if (match) {
          const startColumn = lineContent.indexOf(match[1]) + 1;
          const endColumn = startColumn + match[1].length;
          matches.push({ line, startColumn, endColumn, name: match[1] });
        }
      }

      // Apply new decorations
      const newDecorations = matches.map((match) => ({
        range: new monaco.Range(match.line, match.startColumn, match.line, match.endColumn),
        options: {
          inlineClassName: "clickable-name",
        },
      }));

      editor.deltaDecorations(decorations, newDecorations);
    };

    updateDecorations();

    // Add click handler
    editor.onMouseDown((e: any) => {
      const position = e.target.position;
      const lineContent = editor.getModel()?.getLineContent(position.lineNumber);
      const match = /- name: (\w+)/.exec(lineContent || "");
      if (match && e.target.element?.className.includes("clickable-name")) {
        alert(`You clicked on name: ${match[1]}`);
      }
    });

    // Add hover provider (optional, already in your code)
    monaco.languages.registerHoverProvider("yaml", {
      provideHover(model: any, position: any) {
        const lineContent = model.getLineContent(position.lineNumber);
        const match = /- name: (.+)/.exec(lineContent);
        if (match) {
          return {
            contents: [
              { value: `**Name**: ${match[1]}` },
              { value: "_Click to do something..._" },
            ],
          };
        }
        return null;
      },
    });
  };

  return (
    <>
      <style>{`
        .clickable-name {
          color: #4FC3F7;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
      <Editor
        height="400px"
        theme="vs-dark"
        defaultLanguage="yaml"
        defaultValue={dedent`
        id: cm9ghlzyk0001mb54zt1owa1y
        domain_name: wibuDev
        sub_domains:
          - name: default
            ports:
              - 2000
          - name: noc
            ports:
              - 3012
          - name: wibu-dock
            ports:
              - 3002
          - name: stg-darmasaba
            ports:
              - 3007
          - name: stg-hipmi
            ports:
              - 3005
          - name: wa
            ports:
              - 3001
          - name: hipmi
            ports:
              - 3037
              - 3038
              - 3039
              - 3040
          - name: wibu-storage
            ports:
              - 3120
              - 3121
              - 3122
              - 3123
          - name: io
            ports:
              - 3003
          - name: desa-darmasaba
            ports:
              - 3009
          - name: wibu-bot
            ports:
              - 3150
          - name: wibu-server
            ports:
              - 3006
          - name: tele-server
            ports:
              - 3008
        createdAt: 2025-04-14T03:01:29.804Z
        updatedAt: 2025-04-14T09:15:37.116Z
        deletedAt: null

        `}
        onMount={handleEditorMount}
      />
    </>
  );
};

export default MonacoEditorWithButton;
