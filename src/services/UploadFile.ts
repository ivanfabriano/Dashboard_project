const Uploading = (file: any, filename: string) => {
  file.mv(`assets/files/` + filename);
};

export default Uploading;
