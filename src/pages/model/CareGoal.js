// Define enums using objects
const CareGoalStatus = Object.freeze({
  PROPOSED: 'proposed',
  PLANNED: 'planned',
  ACCEPTED: 'accepted',
  ACTIVE: 'active',
  ON_HOLD: 'on hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected'
});

const CareGoalAchievementStatus = Object.freeze({
  IN_PROGRESS: 'in progress',
  IMPROVING: 'improving',
  WORSENING: 'worsening',
  NO_CHANGE: 'no change',
  ACHIEVED: 'achieved',
  NOT_ACHIEVED: 'not achieved',
  NO_PROGRESS: 'no progress',
  NOT_ATTAINABLE: 'not attainable'
});

// Define allowed priority values
const ALLOWED_PRIORITIES = ['high', 'medium', 'low'];

// Define the CareGoal class
class CareGoal {
  constructor({
    id,
    status,
    achievementStatus,
    priority,
    description,
    startDate,
    dueDate,
    createdOn,
    note
  }) {
    // Validate and initialize properties
    this.id = id;

    if (!Object.values(CareGoalStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${Object.values(CareGoalStatus).join(', ')}`);
    }
    this.status = status;

    if (!Object.values(CareGoalAchievementStatus).includes(achievementStatus)) {
      throw new Error(`Invalid achievement status: ${achievementStatus}. Allowed values are ${Object.values(CareGoalAchievementStatus).join(', ')}`);
    }
    this.achievementStatus = achievementStatus;

    if (!ALLOWED_PRIORITIES.includes(priority)) {
      throw new Error(`Invalid priority: ${priority}. Allowed values are ${ALLOWED_PRIORITIES.join(', ')}`);
    }
    this.priority = priority;

    this.description = description;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.createdOn = createdOn;
    this.note = note;
  }
}

module.exports = {
  CareGoal,
  CareGoalStatus,
  CareGoalAchievementStatus
};