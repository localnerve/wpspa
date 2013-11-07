/*
 * Strings for the application
 *
 * TODO: change this to populate an app string table from the CMS at app start.
 * Proritize into ATF and BTF.
 * Think about a reasonable, extensible application string model...
 */
var strings = {
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
    },
    progress: {
      heading: "Searching..."
    }
  },
  content: {
    item: {
      One: "One",
      Two: "Two",
      Three: "Three",
      comment: "comment",
      commentPlural: "comments"
    },
    error: {
      heading: "Whoops!",
      message: "An error occurred processing your request. Please refresh your browser and try again."
    }
  }
};

define(function() {
  return strings;
});