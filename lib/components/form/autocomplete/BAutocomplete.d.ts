import './autocomplete.sass';
export interface AutocompleteItem<T> {
    id: string;
    isSelected: boolean;
    isHovered: boolean;
    text: string;
    value: T;
    index: number;
}
export declare const BAutocomplete: void;
