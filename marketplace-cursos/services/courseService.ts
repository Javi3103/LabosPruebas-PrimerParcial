import { Course } from '../types/course.type';
import api from './api';

export const searchCourses = async (title: string): Promise<Course[]> => {
    try {
        const response = await api.get(`/courses/search?title=${title}`);
        return response.data as Course[]; // Asegúrate de que el backend devuelva un array de Course
    } catch (error) {
        console.error('Error searching courses:', error);
        throw error;
    }
};

export const createCourse = async (course: { title: string; description: string; price: number }, instructorId: number) => {
    try {
        const response = await api.post('/courses/create', course, {
            params: { instructorId },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};