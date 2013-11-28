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
      message: "An error has occurred processing your search request."
    },
    progress: {
      heading: "Searching..."
    }
  },
  content: {
    numbers: {
      One: "One",
      Two: "Two",
      Three: "Three"
    },
    months: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    },
    labels: {
      comment: "comment",
      Comment: "Comment",
      commentPlural: "comments",
      thought: "thought",
      thoughtPlural: "thoughts",
      Name: "Name",
      Email: "Email",
      Website: "Website",
      requiredMessage: "Required fields are marked",
      requiredSymbol: "*"
    },
    multi: {
      header: {
        categoryArchives: "Category Archives: ",
        monthlyArchives: "Monthly Archives: "
      }
    },
    single: {
      navigation: {
        title: "Post navigation",
        previousEntity: "&larr;",
        nextEntity: "&rarr;"
      },
      comments: {
        title: {
          replacement: "%s",
          message: "Thoughts on %s"
        },
        Reply: "Reply",
        respond: {
          title: "Leave a Reply",
          cancelText: "Cancel reply",
          commentNote: "Your email address will not be published.",
          tagsMessage: "You may use these <abbr title='HyperText Markup Language'>HTML</abbr> tags and attributes:",
          submitText: "Post Comment",
          resultFail: "The comment service is temporarily unavailable.",
          resultServerError: "The server encountered an error processing your response.",
          resultModeration: "Your comment is awaiting moderation.",
          resultComment: "You comment was posted successfully."
        }
      }
    },
    error: {
      heading: "Whoops!",
      message: "An error occurred processing your request.",
      retryButtonText: "Retry"
    }
  }
};

define(function() {
  return strings;
});