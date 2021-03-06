import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
    await fs.promises.unlink(filename);
  } catch {}
};
