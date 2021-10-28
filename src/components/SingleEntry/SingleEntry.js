import React, { useState } from 'react'
import { TextField, MenuItem, Select } from '@mui/material'
import { TimePicker } from '@mui/lab'
import { activeBundlesState } from '../../context/activeBundles'
import { UPDATE_ENTRY } from '../../graphql/mutations/updateEntry'
import { useMutation } from '@apollo/client'
import _ from 'lodash'
import { format } from 'date-fns'
import cogoToast from 'cogo-toast'


export default function SingleEntry({ singleEntry }) {
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
  const [arrayTags, setArrayTags] = useState([])

  const [updateEntry] = useMutation(UPDATE_ENTRY)

  const handleUpdateEntry = () => {
    updateEntry({
      variables: {
        _id: singleEntry._id,
        record: {
          startTime: format(startValue, 'HH:MM'),
          endTime: format(endValue, 'HH:MM'),
          tagBundleName: tagBundle,
          tagName: tag,
        },
      },
    })
    cogoToast.success('Entry was updated')
  }
  const selectedBundleTags = _.filter(activeBundles, { name: tagBundle })


  // const arrayWithTags = []
  // useEffect(() => {
  //   if (tagBundle) {
  //     const selectedBundleTags = _.filter(activeBundles, { name: tagBundle })
  //     const filteredTags = selectedBundleTags[0].tags
  //     console.log(selectedBundleTags[0].tags[2].name)
  //     for (let i = 0; i < selectedBundleTags[0].tags.length; i++) {
  //       arrayWithTags.push(selectedBundleTags[0].tags[i].name)
  //     }
  //     console.log(arrayWithTags)
  //   }
  // }, [tagBundle])

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
        value={singleEntry.tagBundle}
        style={{ minWidth: '12rem' }}
        onChange={(event) => setTagBundle(event.target.value)}
        onBlur={() => {
          if (tag) {
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
        disabled={!tagBundle ? true : false}
        onBlur={() => {
          if (tagBundle) {
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

      {/* <Autocomplete
        style={{ minWidth: '16rem' }}
        options={arrayWithTags}
        disablePortal
        disabled={!tagBundle ? true : false}
        value={tag}
        onKeyDown={(event) => setTag(event.target.value)}
        renderInput={(params) => {
          return <TextField {...params} label="Tags" />
        }}
        onBlur={() => {
          if (tagBundle) {
            handleUpdateEntry()
          }
        }}
      /> */}
    </>
  )
}
