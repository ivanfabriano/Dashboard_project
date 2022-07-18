const FindingCustom = (db: any, query: object) => {
  const data = db.findAll({where: query});

  return data;
};

export default FindingCustom;
