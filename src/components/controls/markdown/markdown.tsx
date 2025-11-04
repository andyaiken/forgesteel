import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Utils } from '@/utils/utils';

interface Props {
	text: string;
	className?: string;
	useSpan?: boolean;
}

export const Markdown = (props: Props) => {
	if (!props.text) {
		return null;
	}

	return (
		<ErrorBoundary>
			{
				props.useSpan ?
					<span className={props.className} dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.text) }} />
					:
					<div className={props.className} dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.text) }} />
			}
		</ErrorBoundary>
	);
};
