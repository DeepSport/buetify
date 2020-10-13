import { computed } from 'vue';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('html', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

export interface UseHighlightedCodeProps {
	code: string;
	lang: 'html' | 'typescript' | 'bash';
}

export function useHighlightedCode(props: UseHighlightedCodeProps) {
	return computed(() => hljs.highlight(props.lang, props.code, true));
}
