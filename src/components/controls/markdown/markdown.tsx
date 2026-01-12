import { BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, ListsToggle, MDXEditor, UndoRedo, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin } from '@mdxeditor/editor';
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
					<span className={props.className} dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.text.trim()) }} />
					:
					<div className={props.className} dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.text.trim()) }} />
			}
		</ErrorBoundary>
	);
};

interface MarkdownEditorProps {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
	const [ value, setValue ] = useState(props.value);
	const debouncedValue = useDebounce(value);

	useEffect(
		() => props.onChange(debouncedValue),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ debouncedValue ]
	);

	const onChange = (str: string) => {
		const sanitized = str.replaceAll('\\<', '<');
		setValue(sanitized);
	};

	return (
		<MDXEditor
			className='markdown-editor'
			placeholder={props.placeholder}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				toolbarPlugin({
					toolbarClassName: 'markdown-editor-toolbar',
					toolbarContents: () => (
						<>
							<UndoRedo />
							<BlockTypeSelect />
							<BoldItalicUnderlineToggles />
							<ListsToggle />
							<CodeToggle />
						</>
					)
				})
			]}
			markdown={value}
			onChange={onChange}
		/>
	);
};
