import React from 'react'
import {useParams, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents, thunkLoadOneEvent } from '../../store/event'
import "../Navigation/Navigation.css"
import "./events.css"



const EventPage = () => {
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const session = useSelector(state => state.session.user)
  const event = useSelector(state => state.events.singleEvent)
  const allEvents = useSelector(state => state.events.allEvents)
  useEffect(() => {
    dispatch(thunkLoadOneEvent(eventId))
    dispatch(thunkLoadEvents())

  }, [dispatch, eventId])

  if (!event) {
    return null
  }


  if (!event.EventImages[0]) {
    event.EventImages[0] = {url: null}
  }

  function getFormattedDate(date) {
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8, 10)
      return month + '-' + day + '-' + year
  }

  return (
  <div>
    <h1 className='eventTitle'>{event.name}</h1>
    <h3>Hosted by {event.Group.name}</h3>
    <div className='eventCardFull'>
      <div className='eventInfo'>
       <img src = {allEvents[eventId].previewImage ? allEvents[eventId].previewImage : event.EventImages[0]} alt={event.previewImage?"yes": 'no'} width={200}></img>
        <div className='bubbleBorder'>
            <p>{getFormattedDate(event.startDate)} to {getFormattedDate(event.endDate)}</p>
            <p>{event.type} Event</p>
        </div>
      </div>

      <h3>Details</h3>
        <div className='fullsite'>
          <p>{event.description}</p>
          {/* I'll hide these buttons when someone can not edit when I can edit my backend */}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/addImage`}>Add an Image</NavLink>: ""}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/update`}>Edit this Event</NavLink> : ""}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/delete`}>Delete this Event</NavLink> : ""}

        </div>
      <div>
    </div>
    </div>

  </div>)
}



export default EventPage
