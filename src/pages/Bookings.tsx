import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Calendar, Clock, MapPin, Users, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Booking {
  id: string
  venue: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'rejected'
  event: string
  attendees: number
  description: string
  submittedAt: string
}

const Bookings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showModal, setShowModal] = useState(false)

  const bookings: Booking[] = [
    {
      id: '1',
      venue: 'Main Auditorium',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      status: 'approved',
      event: 'Tech Conference 2024',
      attendees: 200,
      description: 'Annual technology conference featuring industry experts and latest innovations.',
      submittedAt: '2024-01-10'
    },
    {
      id: '2',
      venue: 'Seminar Hall A',
      date: '2024-01-18',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
      event: 'Workshop on AI',
      attendees: 50,
      description: 'Interactive workshop on artificial intelligence and machine learning.',
      submittedAt: '2024-01-12'
    },
    {
      id: '3',
      venue: 'Computer Lab 1',
      date: '2024-01-12',
      time: '9:00 AM - 11:00 AM',
      status: 'rejected',
      event: 'Programming Contest',
      attendees: 30,
      description: 'Competitive programming contest for computer science students.',
      submittedAt: '2024-01-08'
    }
  ]

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

  const filterBookings = (status?: string) => {
    if (!status || status === 'all') return bookings
    return bookings.filter(booking => booking.status === status)
  }

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowModal(true)
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {getStatusIcon(booking.status)}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-gray-900">{booking.event}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {booking.description}
            </p>
          </div>
        </div>
        <span className={getStatusBadge(booking.status)}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{booking.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{booking.attendees} attendees</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{booking.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Submitted on {booking.submittedAt}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(booking)}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          {booking.status === 'pending' && (
            <>
              <button className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'pending', label: 'Pending', count: filterBookings('pending').length },
    { id: 'approved', label: 'Approved', count: filterBookings('approved').length },
    { id: 'rejected', label: 'Rejected', count: filterBookings('rejected').length }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">
            Track and manage your venue booking requests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {filterBookings('approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filterBookings('pending').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filterBookings(selectedTab).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
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
                      <X className="w-6 h-6" />
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
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-sm text-gray-900">{selectedBooking.description}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted</label>
                      <p className="text-sm text-gray-900">{selectedBooking.submittedAt}</p>
                    </div>

                    {selectedBooking.status === 'rejected' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Rejection Reason</h4>
                        <p className="text-sm text-red-700">
                          The venue is not available for the requested time slot. Please choose a different time or venue.
                        </p>
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

export default Bookings
