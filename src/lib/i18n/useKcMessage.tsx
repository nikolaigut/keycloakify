
import { useCallback } from "react";
import { useKcLanguageTag } from "./useKcLanguageTag";
import { messages } from "./generated_messages/login";
import type { ReactNode } from "react";
//@ts-ignore
import * as markdown from "markdown";

export type MessageKey = keyof typeof messages["en"];

export function useKcMessage() {

    const { kcLanguageTag } = useKcLanguageTag();

    const msgStr = useCallback(
        (key: MessageKey, ...args: (string | undefined)[]): string => {

            let str: string = messages[kcLanguageTag as any as "en"][key] ?? messages["en"][key];

            args.forEach((arg, i) => {

                if (arg === undefined) {
                    return;
                }

                str = str.replace(new RegExp(`\\{${i}\\}`, "g"), arg);

            });

            return str;

        },
        [kcLanguageTag]
    );

    const msg = useCallback<(...args: Parameters<typeof msgStr>) => ReactNode>(
        (key, ...args) =>
            <span
                className={key}
                dangerouslySetInnerHTML={{
                    "__html":
                        markdown.toHTML(msgStr(key, ...args))
                }}
            />
        ,
        [kcLanguageTag]
    );

    return { msg, msgStr };

}