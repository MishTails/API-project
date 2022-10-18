import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkPostEvent } from '../../store/event'



const EventCreate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const events = useSelector(state => state.events.allEvents)
  let count = Object.values(events).length
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('In Person')
  const [capacity, setCapacity] = useState()
  const [price, setPrice] = useState()
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    setValidationErrors(errors)
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    let event = {
      id: count,
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
    console.log(event)
    dispatch(thunkPostEvent(event))
    history.push('/events')
  }

  return (
    <form
      className="fruit-form"
      onSubmit={submitHandler}
    >
      <h2>Create an Event</h2>
      <ul className="errors">
        {/* {validationErrors.length > 0 && validationErrors.map((error) => <li key={error}>{error}</li>)} */}
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
      <button
        type="submit"
        // disabled={!!validationErrors.length}
      >
        Submit
      </button>
    </form>
  );
}

export default EventCreate