export interface Interview {
  _id: string;
  title: string;
  date: Date;
  owner: {
    _id: string;
  };
  candidate: {
    _id: string;
  };
}