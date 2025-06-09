const DateFormatter = (dateString: string) => {
  if (!dateString) {
    return '';
  }
  // Extract date part from ISO string
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default DateFormatter;
