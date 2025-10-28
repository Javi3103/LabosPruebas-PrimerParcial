import { Search, Bell, ShoppingCart } from 'lucide-react'
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import Image from "next/image"

export default function VCourse() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-600" />
              <span className="text-xl font-semibold text-purple-600">V-Course</span>
            </div>
            <div className="relative w-[400px]">
              <Input 
                type="search" 
                placeholder="Search products, voucher, price..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="font-medium">Charlie Richard</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r p-4">
          <nav className="space-y-2">
            <button type="button" className="flex items-center gap-3 rounded-lg bg-purple-50 px-3 py-2 text-purple-600">
              <div className="h-5 w-5 rounded border border-current p-0.5">
                Overview
               </div>
            </button>
            <button>
              key={item}
               type="button"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            </button>
                <div className="h-5 w-5 rounded border border-current p-0.5" />
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Hero Section */}
          <div className="mb-8 rounded-lg bg-gray-100 p-8">
            <div className="text-sm font-medium text-gray-600">THE BEST ONLINE COURSE</div>
            <h1 className="mt-2 text-3xl font-bold">DIVERSE COURSES FOR YOU TO CHOOSE FROM</h1>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            </p>
          </div>

          {/* Course Categories */}
          <div className="mb-8 flex gap-6 border-b">
            {['POPULAR COURSES', 'ALL COURSE', 'MARKETING', 'CRYPTO', 'WEBSITE', 'DESIGN', 'BUSINESS'].map(
              (category) => (
                <button
                  key={category}
                  className={`border-b-2 pb-2 text-sm font-medium ${
                    category === 'POPULAR COURSES'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                title: 'AI Start from the basics',
                instructor: 'Bessie Cooper',
                price: '$109.00',
                rating: 5.0,
              },
              {
                title: 'Web Development',
                instructor: 'Kristin Watson',
                price: '$79.00',
                rating: 4.7,
              },
              {
                title: 'Learn how Excel can be used',
                instructor: 'Leslie Alexander',
                price: '$229.00',
                rating: 5.0,
              },
              {
                title: 'Microsoft Excel in just 5 hours',
                instructor: 'Alena McCoy',
                price: '$199.00',
                rating: 5.0,
              },
            ].map((course) => (
              <div key={course.title} className="overflow-hidden rounded-lg border">
                <div className="aspect-video bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-purple-600">{course.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{course.rating}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={`star-$(i)`} //Usa una clave unica 
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l p-4">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
            <h2 className="mt-4 font-semibold">Charlie Richard</h2>
            <p className="text-sm text-gray-600">(Graphic Designer & Designer)</p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Profile Information</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Birthday:</span>
                <span>14/09/1998</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">ID number:</span>
                <span>12345678902</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Address:</span>
                <span>7290 U.S. 43 Street, Guin City, Alaska</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Mail:</span>
                <span>MrSatan123@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">FEATURED TEACHER</h3>
              <Button variant="ghost" size="sm" className="text-purple-600">
                View All
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {['Wade Warren', 'Eleanor Pena', 'Devon Lane', 'Esther Howard'].map((teacher) => (
                <div key={teacher} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-medium">{teacher}</div>
                    <div className="text-sm text-gray-600">20 Courses</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
