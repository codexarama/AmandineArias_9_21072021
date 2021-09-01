/* ORIGINAL ------------------------------
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const ye = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("fr", { month: "short" }).format(date);
  const da = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(date);
  const month = mo.charAt(0).toUpperCase() + mo.slice(1);
  return `${parseInt(da)} ${month.substr(0, 3)}. ${ye.toString().substr(2, 4)}`;
};*/

/* FRENCH FORMAT ---------------------------
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
  // convert string into number for month value (more simple)
  const mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(date);
  const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);
  // display right french date format
  return `${da}.${mo}.${ye.toString().substr(2, 4)}`;
};*/

// invalid Dates (day-month-year instead of year-month-day) in the DB makes the bill's page to crash
export const formatDate = (dateStr) => {
  // fix : manage formatDate Us / Fr
  if (Date.parse(dateStr) === NaN || dateStr === '') return '1 Jan. 01';

  const date = new Date(dateStr);
  const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date);
  const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);
  const month = mo.charAt(0).toUpperCase() + mo.slice(1);
  return `${parseInt(da)} ${month.substr(0, 3)}. ${ye.toString().substr(2, 4)}`;
};

export const formatStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'accepted':
      return 'Accepté';
    case 'refused':
      // in french like the others
      return 'Refusé';
  }
};
