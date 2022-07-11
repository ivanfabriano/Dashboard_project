const FindingCustom = (db: any, query: object) => {
  const data = db.findOne({where: query});

  return data;
};

export default FindingCustom;
