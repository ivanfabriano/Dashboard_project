const Uploading = (file: any, path: string, filename: string) => {
  file.mv(`public/assets/${path}/` + filename);
};

export default Uploading;
