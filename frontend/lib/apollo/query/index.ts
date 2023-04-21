import { gql } from "@apollo/client";

// https://www.apollographql.com/docs/react/data/operation-best-practices/

export const getAllArticlesByLocale = gql`
  query GetAllArticlesByLocale($locale: I18NLocaleCode) {
    articles(locale: $locale) {
      data {
        id
        attributes {
          title
          description
          content
          slug
          createdAt
          updatedAt
          publishedAt
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
          cover {
            data {
              attributes {
                url
                previewUrl
                ext
                name
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const getArticlesByLocaleAndSlug = gql`
  query GetArticlesByLocaleAndSlug($slug: String, $locale: I18NLocaleCode) {
    articles(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          description
          content
          slug
          createdAt
          updatedAt
          publishedAt
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
          cover {
            data {
              attributes {
                url
                previewUrl
                ext
                name
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const getAboutByLocale = gql`
  query GetAboutByLocale($locale: I18NLocaleCode) {
    about(locale: $locale) {
      data {
        attributes {
          title
          content
          updatedAt
          createdAt
        }
      }
    }
  }
`;
