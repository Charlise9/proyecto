const { format, formatDistanceToNowStrict } = require("date-fns");

function formatDateToDB(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

function formatBirthdayToDB(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

function formatExperience(date) {
  return formatDistanceToNowStrict(new Date(date), "yyyy");
}

module.exports = {
  formatDateToDB,
  formatBirthdayToDB,
  formatExperience,
};
