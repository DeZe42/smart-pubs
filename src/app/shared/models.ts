export interface Pub {
    uid: string,
    imageSrc,
    name: string,
    openStartingHour: string,
    openEndingHour: string,
    currentSpace: number,
    space: number
}

export interface Pubs extends Array<Pub> {

}