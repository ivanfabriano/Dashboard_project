const Deleting = (db: any, id: string) => {
  const deleteData = db.destroy({
    where: {
      id: id,
    },
  });
  return deleteData;
};

export default Deleting;
