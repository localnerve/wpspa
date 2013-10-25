/*
 * specializations/main
 *
 * Special relationship enitites module loader
 */
define([
  "components/content/entities/specializations/category",
  "components/content/entities/specializations/date",
  "components/content/entities/specializations/recent"
], function(category, date, recent) {
  return {
    category: category,
    date: date,
    recent: recent
  };
});