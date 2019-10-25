const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create collection Schema
const ProfileSchema = new Schema({
  user: {
    ref: "users",
    type: Schema.Types.ObjectId
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        require: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        require: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String,
      required: true
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String,
      required: true
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
