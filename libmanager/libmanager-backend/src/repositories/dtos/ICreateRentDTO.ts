interface ICreateRentDTO {
  user_id: string;
  book_id: string;
  rent_initial: Date;
  rent_final: Date;
}

export { ICreateRentDTO };
