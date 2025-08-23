import { Segmented } from 'antd';
import * as htmlToImage from 'html-to-image';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Hero } from '../../../../models/hero';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { Toggle } from '../../../controls/toggle/toggle';
import { HeroSheetPage } from './hero-sheet-page';
import './hero-sheet-page.scss';

interface Props {
    heroes: Hero[];
    sourcebooks: Sourcebook[];
    options: Options;
    setOptions: (options: Options) => void;
}

export const HeroSheetPreviewPage = (props: Props) => {
    const { heroID } = useParams<{ heroID: string }>();
    const hero = useMemo(
        () => props.heroes.find(h => h.id === heroID)!,
        [heroID, props.heroes]
    );

    const [ previewOptions, setPreviewOptions ] = useState<'html' | 'canvas'>('html');

    const setIncludePlayState = (value: boolean) => {
        const copy = Utils.copy(props.options);
        copy.includePlayState = value;
        props.setOptions(copy);
    };

    const setDisplay = (type: 'html' | 'canvas') => {
        setPreviewOptions(type);
        const element = document.getElementById('hero-sheet-page');
        const canvasElem = document.getElementById('pdf-canvas');
        if (element && canvasElem) {
            switch (type) {
                case 'html':
                    element.className = '';
                    canvasElem.className = 'hidden'
                    break;
                case 'canvas':
                    element.className = '';
                    htmlToImage
                        .toCanvas(element)
                        .then(function (canvas) {
                            canvasElem.replaceChildren(canvas);
                            canvasElem.className = ''
                            element.className = 'hidden';
                        });
                    break;
            }
        }
    }

    try {
        return (
            <div id="pdf-preview">
                <div className="menu">
                    <Segmented
                        options={[
                            { value: 'html', label: 'HTML' },
                            { value:'canvas', label: 'Canvas' }
                        ]}
                        value={previewOptions}
                        onChange={setDisplay}
                    />
                    <Toggle label='Include current play state' 
                        value={props.options.includePlayState} 
                        onChange={setIncludePlayState}
                    />
                </div>
                <HeroSheetPage
                    hero={hero}
                    sourcebooks={props.sourcebooks}
                    options={props.options}
                />
                <div id="pdf-canvas"></div>
            </div>
        );
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
