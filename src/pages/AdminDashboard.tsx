import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Users, Building, Calendar, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

interface Venue {
  id: string
  name: string
  type: string
  capacity: number
  status: 'available' | 'maintenance'
}

interface BookingRequest {
  id: string
  user: string
  venue: string
  date: string
  time: string
  event: string
  attendees: number
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [users, setUsers] = useState<User[]>([])
  const [venues, setVenues] = useState<Venue[]>([])
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Sample data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@college.edu', role: 'student', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@college.edu', role: 'faculty', status: 'active' },
      { id: '3', name: 'Mike Johnson', email: 'mike@college.edu', role: 'club', status: 'active' },
      { id: '4', name: 'Sarah Wilson', email: 'sarah@college.edu', role: 'student', status: 'inactive' }
    ])

    setVenues([
      { id: '1', name: 'Main Auditorium', type: 'Auditorium', capacity: 500, status: 'available' },
      { id: '2', name: 'Seminar Hall A', type: 'Seminar Hall', capacity: 100, status: 'available' },
      { id: '3', name: 'Computer Lab 1', type: 'Lab', capacity: 40, status: 'maintenance' },
      { id: '4', name: 'Conference Room', type: 'Meeting Room', capacity: 20, status: 'available' }
    ])

    setBookings([
      {
        id: '1',
        user: 'John Doe',
        venue: 'Main Auditorium',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        event: 'Tech Conference 2024',
        attendees: 200,
        status: 'pending',
        submittedAt: '2024-01-10'
      },
      {
        id: '2',
        user: 'Jane Smith',
        venue: 'Seminar Hall A',
        date: '2024-01-18',
        time: '2:00 PM - 4:00 PM',
        event: 'Workshop on AI',
        attendees: 50,
        status: 'approved',
        submittedAt: '2024-01-08'
      }
    ])
  }, [])

  const handleBookingAction = (bookingId: string, action: 'approve' | 'reject') => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === 'approve' ? 'approved' : 'rejected' }
        : booking
    ))
    setShowModal(false)
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'approved':
      case 'active':
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'rejected':
      case 'inactive':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'maintenance':
        return `${baseClasses} bg-orange-100 text-orange-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Venues",
      value: venues.length,
      icon: Building,
      color: "text-green-600"
    },
    {
      title: "Pending Requests",
      value: bookings.filter(b => b.status === 'pending').length,
      icon: AlertCircle,
      color: "text-yellow-600"
    },
    {
      title: "This Month",
      value: bookings.length,
      icon: Calendar,
      color: "text-purple-600"
    }
  ]

  const tabs = [
    { id: 'bookings', label: 'Booking Requests' },
    { id: 'users', label: 'Users' },
    { id: 'venues', label: 'Venues' }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, venues, and booking requests
          </p>
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

        {/* Management Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Booking Requests Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Booking Requests</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.event}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venue}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking)
                                  setShowModal(true)
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, 'approve')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, 'reject')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(user.status)}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Venues Tab */}
            {activeTab === 'venues' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Venues</h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Venue
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {venues.map((venue) => (
                        <tr key={venue.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{venue.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venue.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venue.capacity}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(venue.status)}>
                              {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal for booking details */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
              
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-gray-900">{selectedBooking.event}</h4>
                      <span className={getStatusBadge(selectedBooking.status)}>
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Requested by</label>
                        <p className="font-medium text-gray-900">{selectedBooking.user}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Venue</label>
                        <p className="font-medium text-gray-900">{selectedBooking.venue}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date</label>
                        <p className="font-medium text-gray-900">{selectedBooking.date}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Time</label>
                        <p className="font-medium text-gray-900">{selectedBooking.time}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Attendees</label>
                        <p className="font-medium text-gray-900">{selectedBooking.attendees}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Submitted</label>
                        <p className="font-medium text-gray-900">{selectedBooking.submittedAt}</p>
                      </div>
                    </div>

                    {selectedBooking.status === 'pending' && (
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleBookingAction(selectedBooking.id, 'approve')}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleBookingAction(selectedBooking.id, 'reject')}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminDashboard
