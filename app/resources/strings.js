/*
 * Strings for the application
 *
 * TODO: change this to populate an app string table from the CMS at app start.
 * Proritize into ATF and BTF.
 * A reasonable CMS (like Wordpress) will allow these to be multi-lingual.
 * Think about a reasonable application string model...
 */
define(function() {
  return {
    search: {
      view: {
        heading: {
          replacement: "%s",
          message: "Search Results for: %s"
        }
      },
      empty: {
        heading: "Nothing Found",
        message: "Sorry, but nothing matched your search terms. Please try again with different keywords.",
        label: "Search for:"
      },
      error: {
        heading: "Search Error",
        message: "An error has occurred processing your search request. Please try again later."
      }
    },
    content: {
      item: {
        One: "One",
        Two: "Two",
        Three: "Three",
        comment: "comment",
        commentPlural: "comments"
      }
    }
  };
});