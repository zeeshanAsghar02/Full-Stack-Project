const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    venue,
    category,
    capacity,
    image // This will be the ImageKit URL
  } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    time,
    venue,
    image,
    category,
    capacity,
    createdBy: req.user.id,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error('Invalid event data');
  }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Event.countDocuments({ ...keyword });
  const events = await Event.find({ ...keyword })
    .populate({
      path: 'createdBy',
      select: 'firstName lastName email',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ date: 1 });

  res.json({ events, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate({
      path: 'createdBy',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'registeredUsers',
      select: 'firstName lastName email',
    });

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    venue,
    category,
    capacity,
    status,
    image // This will be the ImageKit URL
  } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    // Check if reducing capacity is possible
    if (capacity && capacity < event.registeredUsers.length) {
      res.status(400);
      throw new Error('Cannot reduce capacity below number of registered users');
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;
    event.category = category || event.category;
    event.capacity = capacity || event.capacity;
    event.status = status || event.status;
    event.image = image || event.image;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.status !== 'upcoming') {
      res.status(400);
      throw new Error('Can only register for upcoming events');
    }

    if (event.registeredUsers.includes(req.user.id)) {
      res.status(400);
      throw new Error('Already registered for this event');
    }

    if (event.registeredUsers.length >= event.capacity) {
      res.status(400);
      throw new Error('Event is full');
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Unregister from event
// @route   DELETE /api/events/:id/register
// @access  Private
const unregisterFromEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.status !== 'upcoming') {
      res.status(400);
      throw new Error('Can only unregister from upcoming events');
    }

    if (!event.registeredUsers.includes(req.user.id)) {
      res.status(400);
      throw new Error('Not registered for this event');
    }

    event.registeredUsers = event.registeredUsers.filter(
      (id) => id.toString() !== req.user.id.toString()
    );
    await event.save();

    res.json({ message: 'Successfully unregistered from event' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
}; 