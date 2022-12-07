export const fromStringToDate = (date: string) => new Date(date);
export const fromStringNormalTime = (date: string) => {
    const dateTime = fromStringToDate(date);
    return `${dateTime.getDay()}.${dateTime.getMonth()}.${dateTime.getFullYear()} 
    ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
};
