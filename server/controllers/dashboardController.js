const Lead = require("../models/Lead");

const getDashboardStats = async (req, res, next) => {
  try {
    const [counts, valueAgg] = await Promise.all([
      Lead.aggregate([
        {
          $group: {
            _id: null,
            totalLeads: { $sum: 1 },
            newLeads: { $sum: { $cond: [{ $eq: ["$status", "New"] }, 1, 0] } },
            qualifiedLeads: { $sum: { $cond: [{ $eq: ["$status", "Qualified"] }, 1, 0] } },
            wonLeads: { $sum: { $cond: [{ $eq: ["$status", "Won"] }, 1, 0] } },
            lostLeads: { $sum: { $cond: [{ $eq: ["$status", "Lost"] }, 1, 0] } },
          },
        },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: null,
            totalDealValue: { $sum: "$dealValue" },
            totalWonValue: {
              $sum: { $cond: [{ $eq: ["$status", "Won"] }, "$dealValue", 0] },
            },
          },
        },
      ]),
    ]);

    const countData = counts[0] || {
      totalLeads: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      wonLeads: 0,
      lostLeads: 0,
    };
    const valueData = valueAgg[0] || { totalDealValue: 0, totalWonValue: 0 };

    return res.json({
      success: true,
      data: {
        ...countData,
        ...valueData,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboardStats };
