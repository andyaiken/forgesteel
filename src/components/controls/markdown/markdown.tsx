import { BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, InsertTable, ListsToggle, MDXEditor, headingsPlugin, listsPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from '@mdxeditor/editor';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Utils } from '@/utils/utils';
import { useDebounce } from '@/hooks/use-debounce';

import '@mdxeditor/editor/style.css';
import './markdown.scss';

interface MarkdownProps {
	text: string;
	className?: string;
	useSpan?: boolean;
}

export const Markdown = (props: MarkdownProps) => {
	if (!props.text) {
		return null;
	}

	return (
		<ErrorBoundary>
			{
				props.useSpan ?
					<span className={props.className} dangerouslySetInnerHTML={{ __html: Utils.markdownToHtml(props.text.trim()) }} />
					:
					<div className={props.className} dangerouslySetInnerHTML={{ __html: Utils.markdownToHtml(props.text.trim()) }} />
			}
		</ErrorBoundary>
	);
};

interface MarkdownEditorProps {
	placeholder?: string;
	value: string;
	fill?: boolean;
	onChange: (value: string) => void;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
	const [ initialMarkdown ] = useState(() => props.value.replaceAll('<', '\\<'));
	const [ value, setValue ] = useState(props.value);
	const debouncedValue = useDebounce(value);

	useEffect(
		() => props.onChange(debouncedValue),
		[ debouncedValue ]
	);

	const onChange = (str: string) => {
		const sanitized = str.replaceAll('\\<', '<');
		setValue(sanitized);
	};

	return (
		<MDXEditor
			className={props.fill ? 'markdown-editor fill' : 'markdown-editor'}
			placeholder={props.placeholder}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				tablePlugin(),
				thematicBreakPlugin(),
				toolbarPlugin({
					toolbarClassName: 'markdown-editor-toolbar',
					toolbarContents: () => (
						<>
							<BlockTypeSelect />
							<BoldItalicUnderlineToggles />
							<ListsToggle />
							<CodeToggle />
							<InsertTable />
						</>
					)
				})
			]}
			markdown={initialMarkdown}
			onChange={onChange}
		/>
	);
};
