import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const fader = trigger('routeAnimations', [
    transition('* => private_login', fadeToForward()),
    transition('private_login => *', fadeToDown()),
    transition('* => legal_login', fadeToForward()),
    transition('legal_login => *', fadeToDown()),
    transition('* => private_register', fadeToForward()),
    transition('private_register => *', fadeToDown()),
    transition('* => legal_register', fadeToForward()),
    transition('legal_register => *', fadeToDown()),
    transition('* => forgot_password', fadeToForward()),
    transition('forgot_password => *', fadeToDown()),
    transition('* => verify_email', fadeToForward()),
    transition('verify_email => *', fadeToDown()),
]);

function fadeToForward() {
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

function fadeToDown() {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(1) translateY(0)',
            }),
        ], optional),
        query(':leave', [
            animate('400ms ease',
            style({ opacity: 1, transform: 'scale(0) translateY(100%)' })
        ),
    ], optional)];
}

export const slider = trigger('routeAnimations', [
    transition('* <=> *', slideTo('top') ),
]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                zIndex: 1000,
                left: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '100%' })
        ]),
        group([
            // query(':leave', [
            //     animate('500ms ease', style({ [direction]: '100%' }))
            // ], optional),
            query(':enter', [
                animate('500ms ease', style({ [direction]: '0%' }))
            ])
        ]),
    ];
}