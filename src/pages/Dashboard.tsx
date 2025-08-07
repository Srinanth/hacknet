import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, MapPin, Users, Plus, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Booking {
  id: string
  venue: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'rejected'
  event: string
  attendees: number
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    // Sample bookings data
    setBookings([
      {
        id: '1',
        venue: 'Main Auditorium',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        status: 'approved',
        event: 'Tech Conference 2024',
        attendees: 200
      },
      {
        id: '2',
        venue: 'Seminar Hall A',
        date: '2024-01-18',
        time: '2:00 PM - 4:00 PM',
        status: 'pending',
        event: 'Workshop on AI',
        attendees: 50
      },
      {
        id: '3',
        venue: 'Computer Lab 1',
        date: '2024-01-12',
        time: '9:00 AM - 11:00 AM',
        status: 'rejected',
        event: 'Programming Contest',
        attendees: 30
      }
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`
    }
  }

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Approved",
      value: bookings.filter(b => b.status === 'approved').length,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending",
      value: bookings.filter(b => b.status === 'pending').length,
      icon: AlertCircle,
      color: "text-yellow-600"
    },
    {
      title: "This Month",
      value: bookings.length,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">
              Manage your venue bookings and track requests
            </p>
          </div>
          <Link
            to="/book-venue"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Booking
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <p className="text-sm text-gray-600">
              Your latest venue booking requests and their status
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(booking.status)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-gray-900">{booking.event}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.venue}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {booking.attendees} attendees
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/venues" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Check Availability</h3>
                <p className="text-sm text-gray-600">
                  View venue availability calendar
                </p>
              </div>
            </div>
          </Link>

          <Link to="/book-venue" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quick Book</h3>
                <p className="text-sm text-gray-600">
                  Book a venue instantly
                </p>
              </div>
            </div>
          </Link>

          <Link to="/bookings" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">My Requests</h3>
                <p className="text-sm text-gray-600">
                  Track all booking requests
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
