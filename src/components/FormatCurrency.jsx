const FormatCurrency = ({ amount, locale, currency }) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export default FormatCurrency;
