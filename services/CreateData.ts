const Creating = (db: any, data: object): object => {
  const dataCreated = db.create(data);

  return dataCreated;
};

export default Creating;
