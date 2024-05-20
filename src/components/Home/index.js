import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {
  MainContainer,
  CreateTaskDiv,
  CreateFrom,
  FormHeading,
  LabelInputDiv,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  AddTaskDiv,
  MainHeading,
  TagListUl,
  TagList,
  TagBtn,
  TaskUl,
  NoTaskText,
  TaskListLi,
  TaskText,
  TaskTag,
} from './styledComponents'

class Home extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    tagsList: this.props.tagsList,
    inputText: '',
    // eslint-disable-next-line react/destructuring-assignment
    inputTag: this.props.tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  onChangeTag = event => {
    // console.log(event.target.value)
    this.setState({inputTag: event.target.value})
  }

  onChangeInput = event => {
    // console.log(event.target.value)
    this.setState({inputText: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {inputText, inputTag, tagsList} = this.state
    const newTask = {
      id: uuidv4(),
      task: inputText,
      tag: inputTag,
    }

    if (inputText.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputText: '',
        inputTag: tagsList[0].optionId,
      }))
    }
  }

  renderCreateTaskView = () => {
    const {tagsList, inputText, inputTag} = this.state
    // console.log(tagsList)
    return (
      <CreateTaskDiv>
        <CreateFrom onSubmit={this.onSubmitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelInputDiv>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              id="inputText"
              placeholder="Enter the task here"
              value={inputText}
              onChange={this.onChangeInput}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              id="selectTag"
              value={inputTag}
              onChange={this.onChangeTag}
            >
              {tagsList.map(each => (
                <OptionInput key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputDiv>
          <FormBtn type="submit">Add Task</FormBtn>
        </CreateFrom>
      </CreateTaskDiv>
    )
  }

  onClickActiveTag = event => {
    // console.log(event.target.value)
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderTaskCard = () => {
    const {activeTag, taskList} = this.state

    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)

    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {tagsList, taskList, activeTag} = this.state

    return (
      <AddTaskDiv>
        <MainHeading>Tags</MainHeading>
        <TagListUl>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagList key={each.optionId}>
                <TagBtn
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagBtn>
              </TagList>
            )
          })}
        </TagListUl>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </AddTaskDiv>
    )
  }

  render() {
    return (
      <MainContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </MainContainer>
    )
  }
}
export default Home
