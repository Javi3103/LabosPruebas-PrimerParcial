"use client";
import { Search, Bell, ShoppingCart } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "./store/cartStore";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: string;
  rating: number;
  category: string;
}

export default function VCourse() {
  const router = useRouter();
  const { cart, addToCart } = useCartStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("POPULAR COURSES");
  
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "AI Start from the basics",
      instructor: "Bessie Cooper",
      price: "$109.00",
      rating: 5.0,
      category: "POPULAR COURSES",
    },
    {
      id: 2,
      title: "Web Development",
      instructor: "Kristin Watson",
      price: "$79.00",
      rating: 4.7,
      category: "WEBSITE",
    },
    {
      id: 3,
      title: "Learn how Excel can be used",
      instructor: "Leslie Alexander",
      price: "$229.00",
      rating: 5.0,
      category: "BUSINESS",
    },
    {
      id: 4,
      title: "Microsoft Excel in just 5 hours",
      instructor: "Alena McCoy",
      price: "$199.00",
      rating: 5.0,
      category: "BUSINESS",
    },
  ]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL COURSE"
        ? true
        : course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "fill-yellow-400" : "fill-gray-300"
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-600" />
              <span className="text-xl font-semibold text-purple-600">
                V-Course
              </span>
            </div>
            <div className="relative w-[400px]">
              <Input
                type="search"
                placeholder="Search products, voucher, price..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="font-medium">
                {isLoggedIn ? "Charlie Richard" : "Guest User"}
              </span>
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    router.push("/login");
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r p-4">
          {/* ... (same as before) */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* ... Hero Section same as before ... */}

          {/* Course Categories */}
          <div className="mb-8 flex gap-6 border-b">
            {[
              "POPULAR COURSES",
              "ALL COURSE",
              "MARKETING",
              "CRYPTO",
              "WEBSITE",
              "DESIGN",
              "BUSINESS",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`border-b-2 pb-2 text-sm font-medium ${
                  category === selectedCategory
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-600 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-lg border"
              >
                <div className="aspect-video bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-purple-600">
                      {course.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <div className="flex">
                        {renderRatingStars(course.rating)}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => addToCart(course)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l p-4">
          {/* ... (same as before) */}
        </aside>
      </div>
    </div>
  );
}
