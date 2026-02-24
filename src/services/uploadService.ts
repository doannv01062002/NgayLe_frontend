export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    // Return Base64 string for storage in LONGTEXT column
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  },
};
