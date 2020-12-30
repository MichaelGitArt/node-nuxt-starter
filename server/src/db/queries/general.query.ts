import { db } from '../connection';

const isValueUnique = async (
  slug: string,
  tableName: string,
  fieldName: string
): Promise<boolean> => {
  return db(tableName)
    .where({ [fieldName]: slug })
    .first()
    .then((value) => {
      return !Boolean(value);
    });
};

export default {
  isValueUnique,
};
