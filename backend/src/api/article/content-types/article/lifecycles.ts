export default {
  async beforeUpdate(event) {
    const { data } = event.params;
    await validateSlugIsUnique(data.slug);
  },
  async beforeCreate(event) {
    const { data } = event.params;
    await validateSlugIsUnique(data.slug, true);
  },
};

const validateSlugIsUnique = async (slug: string, isCreate?: boolean) => {
  const entries = (await strapi.entityService.findMany("api::article.article", {
    fields: ["id", "slug"],
    filters: {
      slug: slug,
    },
  })) as { id: number; slug: string }[];
  const acceptableLength = isCreate ? 0 : 1;
  if (entries.length > acceptableLength) {
    const { ApplicationError } = require("@strapi/utils").errors;
    throw new ApplicationError("Slug is duplicated!");
  }
};
