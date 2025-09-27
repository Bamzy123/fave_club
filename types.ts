
export interface Song {
  _id: string;
  title: string;
  song: {
    url: string;
  };
  artist: string;
  coverArt: {
    url: string;
  };
  percentage: number;
}
