import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <span className="text-xl font-bold">💊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MediCare</h3>
                <p className="text-sm text-gray-400">Your Health Partner</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online pharmacy providing genuine medicines, supplements, and healthcare products with fast delivery and expert advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Pain Relief" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Pain Relief
                </Link>
              </li>
              <li>
                <Link to="/products?category=Vitamins & Supplements" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Vitamins & Supplements
                </Link>
              </li>
              <li>
                <Link to="/products?category=First Aid" className="text-gray-300 hover:text-white transition-colors text-sm">
                  First Aid
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Health Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Prescription Upload
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">24/7 Support</p>
                  <p className="text-gray-300 text-sm">+1-800-MEDICARE</p>
                  <p className="text-gray-300 text-sm">+1-800-634-4227</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-gray-300 text-sm">support@medicare.com</p>
                  <p className="text-gray-300 text-sm">orders@medicare.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-gray-300 text-sm">123 Health Street</p>
                  <p className="text-gray-300 text-sm">Medical District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Business Hours</p>
                  <p className="text-gray-300 text-sm">Mon-Fri: 8AM-10PM</p>
                  <p className="text-gray-300 text-sm">Sat-Sun: 9AM-8PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">✓</span>
              <span>Licensed Pharmacy</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">🔒</span>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">🚚</span>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">💊</span>
              <span>Genuine Products</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">📞</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 MediCare. All rights reserved. | Licensed Pharmacy #12345
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

