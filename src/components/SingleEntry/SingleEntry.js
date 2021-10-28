import React, { useState, useEffect } from 'react'
import { TextField, MenuItem, Select } from '@mui/material'
import { TimePicker } from '@mui/lab'
import { activeBundlesState } from '../../context/activeBundles'
import { UPDATE_ENTRY } from '../../graphql/mutations/updateEntry'
import { GET_ENTRIES_BY_DATE } from '../../graphql/queries/useGetEntriesByDate'
import { useMutation } from '@apollo/client'
import { useField } from 'formik'
import _ from 'lodash'
import {format} from 'date-fns'

export default function SingleEntry({ singleEntry, date }) {
  let dateObj = undefined
  let dateObjEnd = undefined

  if (singleEntry.startTime) {
    const startValues = singleEntry.startTime.split(':')
    dateObj = new Date(singleEntry.createdAt)
    dateObj.setHours(startValues[0])
    dateObj.setMinutes(startValues[1])
  }

  if (singleEntry.endTime) {
    const endValues = singleEntry.endTime.split(':')
    dateObjEnd = new Date(singleEntry.createdAt)
    dateObjEnd.setHours(endValues[0])
    dateObjEnd.setMinutes(endValues[1])
  }

  const [startValue, setStartValue] = useState(dateObj)
  const [endValue, setEndValue] = useState(dateObjEnd)
  const [tagBundle, setTagBundle] = useState('')
  const [tag, setTag] = useState('')
  const { activeBundles } = activeBundlesState()

  const [updateEntry] = useMutation(UPDATE_ENTRY)

  const handleUpdateEntry = () => {
    updateEntry({
      variables: {
        _id: singleEntry._id,
        record: {
          tagBundleName: tagBundle,
          tagName: tag,
          startTime: format(startValue, "HH:MM"),
          endTime: format(endValue, "HH:MM"),
          date: date,
        },
      },
    })
  }

  const selectedBundleTags = _.filter(activeBundles, { name: tagBundle })
  return (
    //Przekazać i z mapowania wyżej
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
        value={tagBundle}
        style={{ minWidth: '12rem' }}
        onChange={(event) => setTagBundle(event.target.value)}
        onBlur={()=>{
          if(tag){
            handleUpdateEntry()
          }
        }}
      >
        {activeBundles?.map((bundle) => {
          return (
            <MenuItem key={bundle._id} value={bundle.name}>
              {bundle.name}
            </MenuItem>
          )
        })}
      </Select>

      <Select
        value={tag}
        style={{ minWidth: '12rem' }}
        onChange={(event) => setTag(event.target.value)}
        onBlur={()=>{
          if(tag){
            handleUpdateEntry()
          }
        }}
      >
        {selectedBundleTags[0]?.tags.map((tag, index) => {
          return (
            <MenuItem key={index} value={tag.name}>
              {tag.name}
            </MenuItem>
          )
        })}
      </Select>
    </>
  )
}