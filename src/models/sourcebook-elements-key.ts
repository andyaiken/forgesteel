import type { Element } from './element';
import type { Sourcebook } from './sourcebook';

export type SourcebookElementsKey = keyof Omit<Sourcebook, keyof Element | 'isHomebrew' | 'skills' | 'languages'>;
