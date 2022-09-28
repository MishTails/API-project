const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

//Get all Attendees of an Event specified by its Id

router.get("/", async (req, res) => {
  const events = await Event.findAll({
    include: [
    {
      model: Attendance,
      attributes: ['id']
    },
    {
      model: EventImage,
      attributes: ['id', 'eventId', 'url', 'preview']
    },
    {
      model: Group,
      attributes: ['id', 'name', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    }
  ]
  })
  let arr = []
  events.forEach(event => {
    arr.push(event.toJSON())
  })
  arr.forEach(event => {
    event.EventImages.forEach(image => {
      if (image.preview === true) {
        event.previewImage = image.url
      }
    })
    if (event.EventImages.length === 0) {
      event.previewImage = 'no image'
    }
    delete event.EventImages
    let x = 0
    event.Attendances.forEach(attendee => {
      x++
    })
    event.numAttending = x
    delete event.Attendances
  })

  return res.json(arr)
});

//Get details of an Event specified by its Id

router.get("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId,{
    include: [
    {
      model: Attendance,
      attributes: ['id']
    },
    {
      model: EventImage,
      attributes: ['id', 'eventId', 'url', 'preview']
    },
    {
      model: Group,
      attributes: ['id', 'name', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    },
    {
      model: EventImage,
      attributes: ['id', 'url', 'preview']
    }
  ]
  })
  if (!event) {
    res.status = 404;
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  let eventJSON = event.toJSON()
  let x = 0
  eventJSON.Attendances.forEach(attendee => {
    x++
  })
  eventJSON.numAttending = x
  delete eventJSON.Attendances

  return res.json(eventJSON)
});



// NOTHING BELOW THIS
module.exports = router;
