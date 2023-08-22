const LabelLang = require('./label');
const MessageLang = require('./message');
const TitleLang = require('./title');

const Lang = {
  ...LabelLang,
  ...MessageLang,
  ...TitleLang,
};

module.exports = Lang;
