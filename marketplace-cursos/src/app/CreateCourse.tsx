import { useState } from "react";
import { createCourse } from "../../services/courseService";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [instructorId] = useState<number>(1); // Cambiar según el usuario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse({ title, description, price }, instructorId);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full p-2 border"
          required
        />
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
          Create Course
        </button>
      </form>
    </div>
  );
}
