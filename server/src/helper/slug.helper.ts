import shortId from 'shortid';

// config
import { shortIdChars } from '../config/app.config';

// query
import generalQuery from '../db/queries/general.query';

shortId.characters(shortIdChars);

export const generareUniqueSlug = async <T>(
  tableName: string,
  fieldName: keyof T
) => {
  while (true) {
    let slug = shortId.generate().toLocaleLowerCase();
    let isUnique = await generalQuery.isValueUnique(
      slug,
      tableName,
      fieldName as string
    );
    if (isUnique) {
      return slug;
    }
  }
};
