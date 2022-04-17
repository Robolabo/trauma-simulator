

export const getUser = () => {
 const userStr = sessionStorage.getItem('user');
 if(userStr)return JSON.parse(userStr);
 else return null;
}

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

export const setUserSession = (token, user) => {
    console.log('setUserSession')
    
    
    sessionStorage.setItem('token', token);
    console.log ('token: '+token)
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log('user: '+user)
    sessionStorage.setItem(user, token)
    
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    
}
