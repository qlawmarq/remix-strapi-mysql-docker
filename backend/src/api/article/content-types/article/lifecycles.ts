export default {
  async beforeUpdate(event) {
    const { data } = event.params;
    await validateSlugIsUnique(data.slug);
  },
  async beforeCreate(event) {
    const { data } = event.params;
    await validateSlugIsUnique(data.slug);
  },
};

const validateSlugIsUnique = async (slug: string) => {
  const entries = (await strapi.entityService.findMany("api::article.article", {
    fields: ["id", "slug"],
    filters: {
      slug: slug,
    },
  })) as { id: number; slug: string }[];
  if (entries.length >= 2) {
    const { ApplicationError } = require("@strapi/utils").errors;
    throw new ApplicationError("Slug is duplicated!");
  }
};
