const DateFormatter = (dateString: string) => {
  if (!dateString) {
    return '';
  }
  // Get the date portion from collectionWeek
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default DateFormatter;
