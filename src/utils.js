
const formatStringToDate = (value) => {
    let dateRefact;
    let date = value.split('.');
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

    if(date.length === 3 && date[2].length === 4) {
        dateRefact = new Date(value.replace(pattern,'$3-$2-$1'));
    }
    return dateRefact
};

const formatDate = (dt) => {
    const str0l = (val, len) => {
        var strVal = val.toString();
        while (strVal.length < len)
            strVal = '0' + strVal;
        return strVal;
    }
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();
    return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year;
};

export { formatStringToDate, formatDate }