const mongoose = require("../../config/mongodb");

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        default: 'Sent'
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;
