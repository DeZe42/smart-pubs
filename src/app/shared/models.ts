export interface User {
    uid: string,
    email: string,
    emailVerified: boolean,
    legalUser: boolean,
    name: string,
    phoneNumber: string,
    pubUid?: string
}

export interface Pub {
    uid: string,
    imageSrc0,
    imageSrc1,
    imageSrc2,
    companyName: string,
    country: string,
    contry: string,
    city: string,
    address: string,
    description: string,
    twoPerson: number,
    fourPerson: number,
    tables: any,
    space: number,
    openStateMonday: boolean,
    openStateTuesday: boolean,
    openStateWednesday: boolean,
    openStateThursday: boolean,
    openStateFriday: boolean,
    openStateSaturday: boolean,
    openStateSunday: boolean,
    startingHourMonday: string,
    startingHourTuesday: string,
    startingHourWednesday: string,
    startingHourThursday: string,
    startingHourFriday: string,
    startingHourSaturday: string,
    startingHourSunday: string,
    endingHourMonday: string,
    endingHourTuesday: string,
    endingHourWednesday: string,
    endingHourThursday: string,
    endingHourFriday: string,
    endingHourSaturday: string,
    endingHourSunday: string,
    currentSpace: number,
    aperitivMenu: [],
    mainMenu: [],
    desertMenu: [],
    drinkMenu: [],
    reservationsToday?: Reservation[]
}

export interface Pubs extends Array<Pub> {

}

export interface Reservation {
    uid: string,
    pub: string,
    pubName: string,
    date: string,
    time: string,
    table: any,
    spaceNumber: number,
    name: string,
    email: string,
    phoneNumber: string,
    status: string
}