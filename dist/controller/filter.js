export function filterData(data, filters) {
    return data.filter(row => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key];
            if (!filterValue)
                return true;
            if (key === 'lieu' || key === 'date') {
                return (row.hasOwnProperty('lieu_depart') && row.lieu_depart.toLowerCase().includes(filterValue.toLowerCase())) ||
                    (row.hasOwnProperty('lieu_arrivee') && row.lieu_arrivee.toLowerCase().includes(filterValue.toLowerCase())) ||
                    (row.hasOwnProperty('date_depart') && row.date_depart.includes(filterValue)) ||
                    (row.hasOwnProperty('date_arrivee') && row.date_arrivee.includes(filterValue));
            }
            return row.hasOwnProperty(key) && row[key] === filterValue;
        });
    });
}
