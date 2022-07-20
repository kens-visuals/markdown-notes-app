export default (date) => {
  if (!date) return;

  const currentDate = new Date(date.seconds * 1000);
  const day = currentDate.toLocaleString('en-US', { day: 'numeric' });
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const year = currentDate.toLocaleString('en-US', { year: 'numeric' });

  // eslint-disable-next-line consistent-return
  return `${day} ${month} ${year}`;
};
