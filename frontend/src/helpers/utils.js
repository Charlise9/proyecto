import jwt from 'jwt-decode';
import axios from 'axios';


// FUNCIÓN PARA LOGIN DE PACIENTE
export function loginPatient(user, password) {
    try {
        axios.post('http://localhost:3000/users/login', {
            email: user,
            password: password
        })
            .then((response) => {
                console.log(response)
                // ME GUARDO EL TOKEN
                setAuthToken(response.data.data.token);

                // ME GUARDO EL ROL
                const tokenDecoded = jwt(response.data.data.token)
                localStorage.setItem('ROLE', tokenDecoded.role)
                console.log(tokenDecoded.role)

                // ME GUARDO EL ID
                localStorage.setItem('ID', tokenDecoded.id)
                console.log(tokenDecoded.id)
            });
    } catch (error) {
        console.error;
    }
}

// FUNCIÓN PARA LOGIN DE MÉDICO
export function loginDoctor(user, password) {
    try {
        axios.post('http://localhost:3000/doctors/login', {
            email: user,
            password: password
        })
            .then((response) => {
                console.log(response)
                // ME GUARDO EL TOKEN
                setAuthToken(response.data.data.token);

                // ME GUARDO EL ROL
                const tokenDecoded = jwt(response.data.data.token)
                localStorage.setItem('ROLE', tokenDecoded.role)
                console.log(tokenDecoded.role)

                // ME GUARDO EL ID
                localStorage.setItem('ID', tokenDecoded.id)
                console.log(tokenDecoded.id)
            })
    } catch (error) {
        console.error;
    }
}

// FUNCIÓN PARA GUARDAR EN LOCALSTORAGE EL JSONWEBTOKEN
export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('AUTH_TOKEN_KEY', token)
}

// FUNCIÓN PARA RECUPERAR EL TOKEN DESDE EL LOCALSTORAGE
export function getAuthToken() {
    return localStorage.getItem('AUTH_TOKEN_KEY')
}

// FUNCIÓN PARA CONSEGUIR LA FECHA DE CADUCIDAD DEL TOKEN
export function tokenExpiration(encodedToken) {
    let token = jwt(encodedToken);
    if (!token.exp) {
        return null;
    }
    let date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
}

// FUNCIÓN QUE COMPRUEBA SI EL TOKEN ESTÁ UP O DOWN
export function isExpired(token) {
    let expirationDate = tokenExpiration(token);
    return expirationDate < new Date()
}

// FUNCIÓN QUE COMPRUEBA SI LA PERSONA ESTÁ LOGUEADA Y SU TOKEN ES VÁLIDO
export function isLoggedIn() {
    let authToken = getAuthToken();
    return !!authToken && !isExpired(authToken);
}

// FUNCIÓN PARA RECUPERAR EL ID DEL USUARIO
export function getId() {
    return localStorage.getItem('ID')
}

// FUNCIÓN DE LOGOUT
export function logout() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('AUTH_TOKEN_KEY');
    localStorage.removeItem('ID');
    localStorage.removeItem('ROLE');

}