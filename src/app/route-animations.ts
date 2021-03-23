import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const fader = trigger('routeAnimations', [
    transition('* <=> *', fadeTo()),
]);

function fadeTo() {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0) translateY(100%)',
            }),
        ], optional),
        query(':enter', [
            animate('600ms ease',
            style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
    ], optional)];
}

export const slider = trigger('routeAnimations', [
    transition('* => home', slideTo('top') ),
    transition('* => auth', slideTo('top') ),
    transition('auth => *', slideTo('top') ),
    transition('home => *', slideTo('top') ),
]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                zIndex: 200,
                left: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '100%' })
        ]),
        group([
            query(':leave', [
                animate('500ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('500ms ease', style({ [direction]: '0%' }))
            ])
        ]),
    ];
}