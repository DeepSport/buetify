export declare type AllColorsVariant = ColorVariant | ShadeVariant;
export declare type ColorVariantFlags = {
    [K in ColorVariant]: boolean;
};
export declare type ColorVariant = 'is-orange' | 'is-primary' | 'is-info' | 'is-link' | 'is-success' | 'is-warning' | 'is-danger';
export declare type ShadeVariant = 'is-white' | 'is-black' | 'is-light' | 'is-dark' | 'is-black-bis' | 'is-black-ter' | 'is-grey-darker' | 'is-grey-dark' | 'is-grey' | 'is-grey-light' | 'is-grey-lighter' | 'is-white-ter' | 'is-white-bis';
