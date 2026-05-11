const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  personal: {
    name: String, title: String, subtitle: String, bio: String,
    email: String, github: String, linkedin: String, instagram: String,
    resumeUrl: String, location: String, avatar: String
  },
  skills: [{
    name: String, icon: String, level: Number, color: String,
    order: { type: Number, default: 0 }
  }],
  projects: [{
    title: String, subtitle: String, description: String,
    technologies: [String], image: String,
    liveUrl: String, githubUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }],
  experience: [{
    type: { type: String, enum: ['work', 'education', 'certification'], default: 'education' },
    title: String, organization: String, location: String,
    startDate: String, endDate: String,
    current: { type: Boolean, default: false },
    description: String, logo: String,
    order: { type: Number, default: 0 }
  }],
  achievements: [{
    title: String, description: String, image: String, date: String,
    order: { type: Number, default: 0 }
  }],
  feedback: [{
    name: String, role: String, company: String, avatar: String,
    rating: { type: Number, default: 5 }, text: String,
    order: { type: Number, default: 0 }
  }],
  sectionVisibility: {
    skills:       { type: Boolean, default: true },
    projects:     { type: Boolean, default: true },
    experience:   { type: Boolean, default: true },
    achievements: { type: Boolean, default: true },
    feedback:     { type: Boolean, default: true },
    contact:      { type: Boolean, default: true }
  },
  customSections: [{
    id: String, title: String, icon: String,
    type: { type: String, enum: ['list', 'cards', 'text'], default: 'text' },
    content: mongoose.Schema.Types.Mixed,
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
