export default interface Character {
    url: string;
    name: string;
    culture: string;
    born: string;
    died: string;
    titles: (string)[];
    aliases: (string)[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: (string)[];
    books: (string)[];
    povBooks: (string)[];
    tvSeries: (string)[];
    playedBy: (string)[];
    gender: string;
  }
  
  export interface HeaderLinks {
    [key: string]: any
  }