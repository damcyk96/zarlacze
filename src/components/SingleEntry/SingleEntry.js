import React, { useState, useEffect } from 'react'
import { TextField, MenuItem, Select, Autocomplete } from '@mui/material'
import { TimePicker } from '@mui/lab'
import useGetActiveBundles from '../../graphql/queries/useGetActiveBundles'
import { useQuery } from '@apollo/client'
import { GET_TAGS_BY_BUNDLE_ID } from '../../graphql/queries/useGetTagsById'
import Loader from './../Loader/Loader'

export default function SingleEntry({ singleEntry }) {
  const startValues = singleEntry.startTime.split(':')
  const dateObj = new Date(singleEntry.createdAt)
  dateObj.setHours(startValues[0])
  dateObj.setMinutes(startValues[1])

  const endValues = singleEntry.endTime.split(':')
  const dateObjEnd = new Date(singleEntry.createdAt)
  dateObjEnd.setHours(endValues[0])
  dateObjEnd.setMinutes(endValues[1])

  const [startValue, setStartValue] = useState(dateObj || undefined)
  const [endValue, setEndValue] = useState(dateObjEnd || undefined)
  const [listOfActiveBundles, setListOfActiveBundles] = useState()
  const [choosenBundle, setChoosenBundle] = useState('')
  const [listOfTags, setListOfTags] = useState()

  const handleChangeBundle = (event) => {
    setChoosenBundle(event.target.value)
    const pickedTags = listOfActiveBundles.filter((element) => {
      return element.name == choosenBundle
    })
    if (pickedTags[0].tags) {
      setListOfTags(pickedTags[0].tags)
    } else {
      setListOfTags('')
    }
  }

  const activeBundles = useGetActiveBundles()

  useEffect(() => {
    if (activeBundles.data) {
      setListOfActiveBundles(activeBundles.data)
    }
  }, [])

  if (activeBundles.loading) return <Loader />
  return (
    <>
      <TimePicker
        flex
        label="Start time"
        value={startValue}
        ampm={false}
        onChange={(newValue) => {
          setStartValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="End time"
        value={endValue || startValue}
        ampm={false}
        minTime={startValue}
        onChange={(newValue) => {
          setEndValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Bundle"
        value={
          choosenBundle !== '' ? choosenBundle : singleEntry.tag?.tagBundle.name
        }
        style={{ minWidth: '12rem' }}
        onChange={handleChangeBundle}
      >
        {listOfActiveBundles &&
          listOfActiveBundles.map((activeBundle, i) => {
            return (
              <MenuItem key={i} value={activeBundle.name}>
                {activeBundle.name}
              </MenuItem>
            )
          })}
      </Select>

      <Autocomplete
        disablePortal
        defaultValue={singleEntry.tag?.tagBundle.name}
        options={''}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  )
}
