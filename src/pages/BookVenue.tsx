import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useNotifications } from '../contexts/NotificationContext'
import { CalendarIcon, Clock, MapPin, Users, CheckCircle } from 'lucide-react'

const BookVenue: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedVenue, setSelectedVenue] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [attendees, setAttendees] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { addNotification } = useNotifications()
  const navigate = useNavigate()

  const venues = [
    { id: "main-auditorium", name: "Main Auditorium", capacity: 500, type: "Auditorium" },
    { id: "seminar-hall-a", name: "Seminar Hall A", capacity: 100, type: "Seminar Hall" },
    { id: "seminar-hall-b", name: "Seminar Hall B", capacity: 80, type: "Seminar Hall" },
    { id: "computer-lab-1", name: "Computer Lab 1", capacity: 40, type: "Lab" },
    { id: "computer-lab-2", name: "Computer Lab 2", capacity: 40, type: "Lab" },
    { id: "classroom-101", name: "Classroom 101", capacity: 60, type: "Classroom" },
    { id: "classroom-102", name: "Classroom 102", capacity: 60, type: "Classroom" },
    { id: "conference-room", name: "Conference Room", capacity: 20, type: "Meeting Room" }
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    addNotification({
      type: 'success',
      title: 'Booking Submitted',
      message: 'Your venue booking request has been submitted successfully!'
    })
  }

  const handleNewBooking = () => {
    setSubmitted(false)
    setSelectedDate('')
    setSelectedVenue('')
    setEventName('')
    setDescription('')
    setAttendees('')
    setStartTime('')
    setEndTime('')
  }

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your venue booking request has been submitted successfully. You will receive a notification once it's reviewed by the admin.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">Request Details:</h3>
              <div className="text-sm space-y-1">
                <p><strong>Event:</strong> {eventName}</p>
                <p><strong>Venue:</strong> {venues.find(v => v.id === selectedVenue)?.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {startTime} - {endTime}</p>
                <p><strong>Attendees:</strong> {attendees}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleNewBooking}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book a Venue</h1>
          <p className="text-gray-600">
            Submit a request to book a venue for your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="event-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name *
                  </label>
                  <input
                    id="event-name"
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your event"
                  />
                </div>
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Attendees *
                  </label>
                  <input
                    id="attendees"
                    type="number"
                    required
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of attendees"
                  />
                </div>
              </div>
            </div>

            {/* Venue Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Venue Selection</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                    Venue *
                  </label>
                  <select
                    id="venue"
                    required
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name} - {venue.type} ({venue.capacity} seats)
                      </option>
                    ))}
                  </select>
                </div>
                {selectedVenue && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">
                        {venues.find(v => v.id === selectedVenue)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {venues.find(v => v.id === selectedVenue)?.capacity} people</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <select
                  id="start-time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select start time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <select
                  id="end-time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select end time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDate || !selectedVenue || !eventName || !attendees || !startTime || !endTime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Booking Request
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default BookVenue
