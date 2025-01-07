import { Utils } from '../../../utils/utils';

interface Props {
	value?: string;
}
export const Markdown = (props: Props) =>
	props.value
		? (<div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.value) }} />)
		: null;
