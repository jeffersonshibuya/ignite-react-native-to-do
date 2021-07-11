import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const task = tasks.find(task => task.title === newTaskTitle)

    if (task) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return;
    }
    setTasks([...tasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const task = tasks.find(task => task.id === id) as Task
    task.done = !task?.done
    setTasks([...tasks])

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Cancel'
      }, {
        text: 'Confirmar',
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id))
        }
      }
    ])

  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const task = tasks.find(task => task.id === taskId) as Task
    task.title = taskNewTitle;
    setTasks([...tasks])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})