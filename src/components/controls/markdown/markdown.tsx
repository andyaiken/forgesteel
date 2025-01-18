import { Utils } from '../../../utils/utils';

interface Props {
	text: string | undefined;
	useSpan?: boolean;
}

export const Markdown = (props: Props) => {
	if (!props.text) {
		return null;
	}

	const md = Utils.showdownConverter.makeHtml(props.text);

	if (props.useSpan) {
		return (
			<span dangerouslySetInnerHTML={{ __html: md }} />
		);
	}

	return (
		<div dangerouslySetInnerHTML={{ __html: md }} />
	);
};
