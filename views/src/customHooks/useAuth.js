import {useSelector} from 'react-redux';

export const useAuth = () => {
    const token = useSelector(state => state.login.token) || localStorage.getItem('auth');
    const username = useSelector(state => state.login.user?.username) || localStorage.getItem('username');
    const id = useSelector(state => state.login.id);
    return { token, username, id };
}