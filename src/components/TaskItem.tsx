import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png'
import xIcon from '../assets/icons/x/x.png'

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({
  task: item,
  index,
  toggleTaskDone,
  removeTask,
  editTask
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleEdit, setTitleEdit] = useState(item.title)

  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setIsEditing(false)
    setTitleEdit(item.title)
  }

  function handleSubmitEditing() {
    editTask(item.id, titleEdit)
    setIsEditing(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done
              ? styles.taskMarkerDone
              : styles.taskMarker
            }
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            //TODO - use style prop
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={titleEdit}
            onChangeText={setTitleEdit}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />

        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing
          ?
          <TouchableOpacity
            testID={`x-${index}`}
            onPress={handleCancelEditing}
          >
            <Icon name='x' size={24} color='#b2b2b2' />
          </TouchableOpacity>
          : <TouchableOpacity
            testID={`pen-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        }

        <View style={styles.divider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },

})