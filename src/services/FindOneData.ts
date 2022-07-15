const FindingOne = (db: any, id: string, include?: any) => {
  const data = db.findByPk(id, include ? { include: include } : {});

  return data;
};

export default FindingOne;
