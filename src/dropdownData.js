// dropdownData.js
const dropdownData = [
  
    { key: 'ID_1', label: 'Ice Cube', value: 'Ice Cube' },
    { key: 'ID_2', label: 'Dr. Dre', value: 'Dr. Dre' },
    { key: 'ID_3', label: 'Easy E', value: 'Easy E' },

];

// Sort the array alphabetically based on the label property
dropdownData.sort((a, b) => a.label.localeCompare(b.label));

export default dropdownData;