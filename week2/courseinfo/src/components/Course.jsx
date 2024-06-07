const Course = ({ courses }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => {
          const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
          return (
            <div key={course.id}>
              <h2>{course.name}</h2>
              {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
              <h3>total of {total} exercises</h3>
            </div>
          );
        })}
      </div>
    );
  }

  export default Course