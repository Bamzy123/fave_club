export interface Project {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    progress: number;
}

export enum View {
    Artist = 'artist',
    Fan = 'fan',
}