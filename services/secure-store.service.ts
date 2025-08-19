import * as SecureStore from 'expo-secure-store';


export async function saveSecureValue(key:string, value:string) {
    await SecureStore.setItemAsync(key, value);
}


export async function getSecureValue(key:string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    //   alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        return null
    //   alert('No values stored under that key.');
    }
}

export async function removeSecureValue(key : string) {
    await SecureStore.deleteItemAsync(key)
}