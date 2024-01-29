export const nameOf = (f) => (f).toString().replace(/(\(\) => )/g,'');

export const filteredNameOf = (f) => {
    const str = nameOf(f);
    const split = str.split('.');
    return split[split.length-1]

};

export const findByID = (id, array=[]) => {
    if (!id) return null; // Handle case where cityId is null or undefined

    if (!array) return null;

    console.log("findById: "+id);
    const item= array.find(item => item.id === id);
    return item ? item : array[0];
};

export const findNameByID = (id, array=[]) => {
    if (!id) return 'undefined'; // Handle case where cityId is null or undefined

    if (!array) return 'noCities';

    const item = array.find(item => item.id === id);
    return item ? item.name : 'Unknown'; // Return city name or 'Unknown' if city not found
};

export const findTypeByID = (id, array=[]) => {
    if (!id) return 'undefined'; // Handle case where cityId is null or undefined

    if (!array) return 'emptyArray';

    const item = array.find(item => item.id === id);
    return item ? item.type : 'Unknown'; // Return city name or 'Unknown' if city not found
};

// A function to generate options array based on class properties
export const generateOptionsFromProperties = (className) => {
    const classProperties = Object.keys(className)
        .filter(property => !(/\bId$/i.test(property)) && !(/guid/i.test(property))); // Filter out properties ending with "Id" and containing "guid" (case insensitive)
    return classProperties.map((property) => ({
        label: property.charAt(0).toUpperCase() + property.slice(1).replace(/Id$/, ''), // Capitalize first letter,
        value: property,
    }));
};

// Get token
export function getToken(){
    return localStorage.getItem('access_token');
}