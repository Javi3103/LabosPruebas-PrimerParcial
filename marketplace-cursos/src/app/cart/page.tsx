"use client"

import { Button } from "@/ui/button"
import { useCartStore } from "../store/cartStore"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore()

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/" className="text-purple-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-gray-600">{course.instructor}</p>
                <span className="text-purple-600 font-semibold">{course.price}</span>
              </div>
              <Button 
                variant="destructive"
                onClick={() => removeFromCart(course.id)}
              >
                Remove
              </Button>
            </div>
          ))}
          
          <div className="border-t pt-4 flex justify-between items-center">
            <div className="font-bold text-lg">
              Total: ${cart.reduce((sum, item) => sum + Number(item.price.replace('$', '')), 0)}
            </div>
            <div className="space-x-4">
              <Button onClick={clearCart}>Clear Cart</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}