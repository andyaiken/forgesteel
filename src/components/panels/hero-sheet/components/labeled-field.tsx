import { Utils } from '../../../../utils/utils';
import './labeled-field.scss';

interface TextProps {
    content: string | number | undefined;
    label: string;
    additionalClasses?: string[];
}

export const LabeledTextField = (props: TextProps) => {
    const classes = ['labeled-field'].concat(props.additionalClasses || []).join(' ');
    const content = Utils.isNullOrEmpty(props.content?.toString()) ? <>&nbsp;</> : props.content;
    return (
        <div className={classes}>
            <label>{props.label}</label>
            <div className='labeled-field-content'><span>{content}</span></div>
        </div>
    );
};

interface BoolProps {
    value: boolean | undefined;
    label: string;
    additionalClasses?: string[];
}

export const LabeledBooleanField = (props: BoolProps) => {
    const classes = ['labeled-boolean'].concat(props.additionalClasses || []).join(' ');
    const box = props.value || false ? '◆' : '◇';
    return (
        <div className={classes}>
            <label>{props.label}</label>
            <div className='labeled-boolean-content'><span>{box}</span></div>
        </div>
    );
};
