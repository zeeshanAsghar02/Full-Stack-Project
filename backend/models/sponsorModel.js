const mongoose = require('mongoose');

const sponsorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    logo: {
      type: String,
      required: [true, 'Please add a logo'],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    contactPerson: {
      name: String,
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
      },
      phone: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'pending',
    },
    type: {
      type: String,
      enum: ['Gold', 'Silver', 'Bronze', 'Other'],
      required: [true, 'Please specify sponsor type'],
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    startDate: {
      type: Date,
      required: [true, 'Please add start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please add end date'],
    },
    contribution: {
      type: Number,
      required: [true, 'Please add contribution amount'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sponsor', sponsorSchema); 