import { Utils } from '../../../utils/utils';

interface Props {
	text: string;
	className?: string;
	useSpan?: boolean;
}

export const Markdown = (props: Props) => {
	if (!props.text) {
		return null;
	}

	const md = Utils.showdownConverter.makeHtml(props.text);

	if (props.useSpan) {
		return (
			<span className={props.className} dangerouslySetInnerHTML={{ __html: md }} />
		);
	}

	return (
		<div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />
	);
};
