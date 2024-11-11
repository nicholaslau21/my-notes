export const fetchFromLocalStorage = (itemName: string) => {
    let jsonValue = localStorage.getItem(itemName);
    if (jsonValue) {
        return JSON.parse(jsonValue);
    } else {
        return [];
    }
};

export const storeInLocalStorage = <T>(itemName: string, data: T) => {
    localStorage.setItem(itemName, JSON.stringify(data));
};
