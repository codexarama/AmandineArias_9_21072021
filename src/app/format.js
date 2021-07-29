export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date)
  // convert string into number for month value (more simple)
  const mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(date)
  const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date)
  // display right french date format
  return `${(da)}.${mo}.${ye.toString().substr(2,4)}`
}

export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "accepted":
      return "Accepté"
    case "refused":
      // in french like others
      return "Refusé"
  }
}