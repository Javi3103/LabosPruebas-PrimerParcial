import { User } from '../types/user.type';
import api from './api';

export const registerUser = async (user: User) => {
    try {
        const response = await api.post('/users/register', user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const enrollInCourse = async (userId: number, courseId: number) => {
    try {
        const response = await api.post('/users/enroll', null, {
            params: { userId, courseId },
        });
        return response.data;
    } catch (error) {
        console.error('Error enrolling in course:', error);
        throw error;
    }
};