function convertToDate(dateString: string): string {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1; // Month is zero-based in JavaScript Date
    const date = new Date(year, month, 1);

    // Format the date to "YYYY-MM-DD HH:MM:SS"
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01 00:00:00`;
}

export {convertToDate}
