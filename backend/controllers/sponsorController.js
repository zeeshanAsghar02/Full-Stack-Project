const asyncHandler = require('express-async-handler');
const Sponsor = require('../models/sponsorModel');
const Event = require('../models/eventModel');

// @desc    Create a new sponsor
// @route   POST /api/sponsors
// @access  Private/Admin
const createSponsor = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    logo,
    website,
    contactPerson,
    type,
    startDate,
    endDate,
    contribution,
  } = req.body;

  // Validate dates
  if (new Date(startDate) > new Date(endDate)) {
    res.status(400);
    throw new Error('Start date must be before end date');
  }

  const sponsor = await Sponsor.create({
    name,
    description,
    logo,
    website,
    contactPerson,
    type,
    startDate,
    endDate,
    contribution,
    createdBy: req.user.id,
  });

  if (sponsor) {
    res.status(201).json(sponsor);
  } else {
    res.status(400);
    throw new Error('Invalid sponsor data');
  }
});

// @desc    Get all sponsors
// @route   GET /api/sponsors
// @access  Public
const getSponsors = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const type = req.query.type ? { type: req.query.type } : {};
  const status = req.query.status ? { status: req.query.status } : {};

  const count = await Sponsor.countDocuments({ ...keyword, ...type, ...status });
  const sponsors = await Sponsor.find({ ...keyword, ...type, ...status })
    .populate({
      path: 'createdBy',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'events',
      select: 'title date venue status',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ 
    sponsors, 
    page, 
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get single sponsor
// @route   GET /api/sponsors/:id
// @access  Public
const getSponsorById = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id)
    .populate({
      path: 'createdBy',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'events',
      select: 'title date venue status',
    });

  if (sponsor) {
    res.json(sponsor);
  } else {
    res.status(404);
    throw new Error('Sponsor not found');
  }
});

// @desc    Update sponsor
// @route   PUT /api/sponsors/:id
// @access  Private/Admin
const updateSponsor = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    logo,
    website,
    contactPerson,
    type,
    status,
    startDate,
    endDate,
    contribution,
  } = req.body;

  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    res.status(404);
    throw new Error('Sponsor not found');
  }

  // Validate dates if both are provided
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    res.status(400);
    throw new Error('Start date must be before end date');
  }

  sponsor.name = name || sponsor.name;
  sponsor.description = description || sponsor.description;
  sponsor.logo = logo || sponsor.logo;
  sponsor.website = website || sponsor.website;
  sponsor.contactPerson = contactPerson || sponsor.contactPerson;
  sponsor.type = type || sponsor.type;
  sponsor.status = status || sponsor.status;
  sponsor.startDate = startDate || sponsor.startDate;
  sponsor.endDate = endDate || sponsor.endDate;
  sponsor.contribution = contribution || sponsor.contribution;

  const updatedSponsor = await sponsor.save();
  
  res.json(await updatedSponsor.populate([
    {
      path: 'createdBy',
      select: 'firstName lastName email',
    },
    {
      path: 'events',
      select: 'title date venue status',
    },
  ]));
});

// @desc    Delete sponsor
// @route   DELETE /api/sponsors/:id
// @access  Private/Admin
const deleteSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    res.status(404);
    throw new Error('Sponsor not found');
  }

  await Sponsor.deleteOne({ _id: req.params.id });
  res.json({ message: 'Sponsor removed successfully' });
});

// @desc    Add event to sponsor
// @route   PUT /api/sponsors/:id/events
// @access  Private/Admin
const addEventToSponsor = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  // Validate eventId
  if (!eventId) {
    res.status(400);
    throw new Error('Please provide an event ID');
  }

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  const sponsor = await Sponsor.findById(req.params.id);
  if (!sponsor) {
    res.status(404);
    throw new Error('Sponsor not found');
  }

  // Check if event is already added
  if (sponsor.events.includes(eventId)) {
    res.status(400);
    throw new Error('Event already added to sponsor');
  }

  sponsor.events.push(eventId);
  await sponsor.save();

  res.json(await sponsor.populate([
    {
      path: 'createdBy',
      select: 'firstName lastName email',
    },
    {
      path: 'events',
      select: 'title date venue status',
    },
  ]));
});

// @desc    Remove event from sponsor
// @route   DELETE /api/sponsors/:id/events/:eventId
// @access  Private/Admin
const removeEventFromSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);
  if (!sponsor) {
    res.status(404);
    throw new Error('Sponsor not found');
  }

  // Check if event exists in sponsor's events
  if (!sponsor.events.includes(req.params.eventId)) {
    res.status(400);
    throw new Error('Event not found in sponsor\'s events');
  }

  sponsor.events = sponsor.events.filter(
    (id) => id.toString() !== req.params.eventId
  );
  await sponsor.save();

  res.json(await sponsor.populate([
    {
      path: 'createdBy',
      select: 'firstName lastName email',
    },
    {
      path: 'events',
      select: 'title date venue status',
    },
  ]));
});

module.exports = {
  createSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
  addEventToSponsor,
  removeEventFromSponsor,
}; 