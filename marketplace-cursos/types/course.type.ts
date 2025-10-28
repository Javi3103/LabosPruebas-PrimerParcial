export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    instructor: User;
}