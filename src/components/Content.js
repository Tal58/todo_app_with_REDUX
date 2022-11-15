import TodoList from './TodoList'
import React from 'react'
import ContentFooter from './ContentFooter'

function Content() {
  return (
    <>
    <section className='main'>
        <input className='toggle-all' type="checkbox"/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
       
    </section>
    <ContentFooter />
    </>
    
  )
}

export default Content