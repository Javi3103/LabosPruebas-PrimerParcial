import { useState } from 'react';
import { searchCourses } from '../../services/courseService'; // Importa la función
import { Course } from '../../types/course.type'; // Importa la interfaz

const CourseSearch = () => {
    const [courses, setCourses] = useState<Course[]>([]); // Especifica el tipo de courses
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const data = await searchCourses(searchTerm);
            setCourses(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {courses.map((course) => (
                    <div key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Price: ${course.price}</p>
                        <p>Rating: {course.rating}</p>
                        <p>Instructor: {course.instructor.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseSearch;