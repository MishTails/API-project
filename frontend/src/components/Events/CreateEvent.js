import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkPostEvent, thunkLoadEvents, thunkPostEventImage } from '../../store/event'
import '../Navigation/Navigation.css'


const EventCreate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const eventsObj = useSelector(state => state.events.allEvents)
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('In Person')
  const [capacity, setCapacity] = useState(10)
  const [price, setPrice] = useState(0)
  const [previewImage, setPreviewImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  let events
  useEffect(() => {
    const errors = []
    if (name.length < 5) {
      errors.push("Name must be 5 characters or more")
    }
    if (startDate.length === 0) {
      errors.push("Start Date is required")
    }
    if (endDate.length === 0) {
      errors.push("End Date is required")
    }
    if (description.length < 20) {
      errors.push("Description must be longer than 20 characters")
    }
    if (capacity.length === 0) {
      errors.push("Capacity is required")
    }
    if (price.length === 0) {
      errors.push("Price is required")
    }

    setValidationErrors(errors)
  }, [name, startDate, endDate, description, capacity, price])

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if (!eventsObj) {
    return null
  }


  const submitHandler = (e) => {
    e.preventDefault()
    events= Object.values(eventsObj)
    let count = Object.values(events).length
    let event = {
      id: count+1,
      venueId: 2,
      // need to come back and fix this hardcode
      groupId: 1,
      name,
      description,
      type,
      capacity,
      price,
      startDate,
      endDate
    }
    let preview = {
      id: 1,
      eventId: count+1,
      url: previewImage,
      preview: true
    }

    dispatch(thunkPostEvent(event))
    dispatch(thunkPostEventImage(preview))
    history.push(`/events/${event.id}`)
  }

  return (
    <form className='form'
      onSubmit={submitHandler}
    >
      <h2>Create an Event</h2>
      <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        Start Date
        <input
          type="text"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>
      <label>
        End Date
        <input
          type="text"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
        <input
          checked={type === 'In Person'}
          type="radio"
          value="In Person"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        In Person
      </label>
      <label>
        <input
          checked={type === 'Online'}
          type="radio"
          value="Online"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        Online
      </label>
      <label>
        Capacity
        <input
          type="number"
          name="capacity"
          onChange={(e) => setCapacity(e.target.value)}
          value={capacity}
        />
      </label>
      <label>
        Price
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </label>
      <label>
        Preview Image
        <input
          type="text"
          name="previewImage"
          onChange={(e) => setPreviewImage(e.target.value)}
          value={previewImage}
        />
      </label>
      <button className='formButton'
        type="submit"
        disabled={!!validationErrors.length}
      >
        Submit
      </button>
    </form>
  );
}

export default EventCreate
