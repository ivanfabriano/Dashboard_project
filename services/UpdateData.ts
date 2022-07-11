const Updating = (db: any, data: object, id: string) => {
  const dataUpdate = db.update(data, { where: { id: id } });

  return dataUpdate;
};

export default Updating;
