export interface i_review {
  avgRating: number;
  totalReviews:number;
  reviews: i_reviews[];
  fiveRating: number;
  fourRating: number;
  threeRating: number;
  twoRating: number;
  oneRating: number;
}

interface i_reviews {
  _id: string;
  labour_id: string;
  hire_id: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
  client: {
    _id: string;
    name: string;
    profilePicture?:string
  };
}
