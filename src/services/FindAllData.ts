const FindingAll = (db: any, include?: any) => {
  const data = db.findAll(include ? { include: include } : {});

  return data;
};

export default FindingAll;
