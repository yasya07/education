import axios from "axios";

const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== 'apiCall') {
        next(action)
        return
    }

    next(action)

    const {url, method, data, start, onSuccess, onFile} = action.payload

    dispatch({
        type: start
    })

    axios({
        baseURL: 'https://batirovic-login-register.herokuapp.com',
        url,
        method,
        data
    }).then((res) => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFile,
            payload: err.data
        })
    })
}

export default api