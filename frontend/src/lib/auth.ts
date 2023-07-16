
// checks if user is logged in by checking if token exists in local storage
export function isLoggedIn<T>(): boolean {
    
    // if (typeof window !== 'undefined') return false;

    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    return token !== null && email !== null && token !== '' && email !== '' && token !== 'null' && email !== 'null'
}
