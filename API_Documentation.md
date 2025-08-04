# Employee Task Manager API Documentation

## Overview
The Employee Task Manager API is a RESTful service built with Node.js, Express, TypeScript, and Firebase Firestore. It provides comprehensive functionality for managing employees and their tasks with time tracking capabilities.

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Data Models

### Employee
```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
}
```

## API Endpoints

### Employee Management

#### 1. Get All Employees
- **URL**: `GET /employees`
- **Description**: Retrieve all employees from the database
- **Response**: Array of employee objects
- **Status Codes**: 
  - `200 OK` - Success
  - `404 Not Found` - No employees found

**Example Response:**
```json
[
  {
    "id": "employee123",
    "name": "John Doe",
    "email": "john.doe@company.com",
    "position": "Software Developer"
  },
  {
    "id": "employee456",
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "position": "Project Manager"
  }
]
```

#### 2. Get Employee by ID
- **URL**: `GET /employees/:id`
- **Description**: Retrieve a specific employee by their ID
- **Parameters**: `id` (string) - Employee ID
- **Response**: Employee object
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Employee not found

**Example Response:**
```json
{
  "id": "employee123",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Developer"
}
```

#### 3. Create Employee
- **URL**: `POST /employees`
- **Description**: Create a new employee
- **Required Fields**: `name`, `email`
- **Optional Fields**: `position`
- **Response**: Created employee object
- **Status Codes**:
  - `201 Created` - Success
  - `400 Bad Request` - Missing required fields

**Example Request:**
```json
{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Developer"
}
```

**Example Response:**
```json
{
  "id": "generated-id-123",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Developer"
}
```

#### 4. Update Employee
- **URL**: `PUT /employees/:id`
- **Description**: Update an existing employee's information
- **Parameters**: `id` (string) - Employee ID
- **Response**: Updated employee object
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Employee not found

**Example Request:**
```json
{
  "name": "John Doe Updated",
  "email": "john.doe.updated@company.com",
  "position": "Senior Software Developer"
}
```

#### 5. Delete Employee
- **URL**: `DELETE /employees/:id`
- **Description**: Delete an employee from the database
- **Parameters**: `id` (string) - Employee ID
- **Response**: No content
- **Status Codes**:
  - `204 No Content` - Success

#### 6. Get Employee Tasks
- **URL**: `GET /employees/:id/tasks`
- **Description**: Get all tasks assigned to a specific employee
- **Parameters**: `id` (string) - Employee ID
- **Response**: Array of task objects
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Employee not found

**Example Response:**
```json
[
  {
    "id": "task123",
    "employeeId": "employee123",
    "title": "Develop API",
    "description": "Create REST API endpoints",
    "startTime": null,
    "endTime": null
  },
  {
    "id": "task456",
    "employeeId": "employee123",
    "title": "Write Tests",
    "description": "Create unit tests for the API",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": null
  }
]
```

#### 7. Get Employee with Tasks
- **URL**: `GET /employees/:id/with-tasks`
- **Description**: Get employee information along with all their assigned tasks
- **Parameters**: `id` (string) - Employee ID
- **Response**: Employee object with tasks array
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Employee not found

**Example Response:**
```json
{
  "id": "employee123",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Developer",
  "tasks": [
    {
      "id": "task123",
      "employeeId": "employee123",
      "title": "Develop API",
      "description": "Create REST API endpoints",
      "startTime": null,
      "endTime": null
    }
  ]
}
```

### Task Management

#### 1. Get All Tasks
- **URL**: `GET /tasks`
- **Description**: Retrieve all tasks from the database
- **Response**: Array of task objects
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - No tasks found

**Example Response:**
```json
[
  {
    "id": "task123",
    "employeeId": "employee123",
    "title": "Develop API",
    "description": "Create REST API endpoints",
    "startTime": null,
    "endTime": null
  },
  {
    "id": "task456",
    "employeeId": "employee123",
    "title": "Write Tests",
    "description": "Create unit tests for the API",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": null
  }
]
```

#### 2. Get Task by ID
- **URL**: `GET /tasks/:id`
- **Description**: Retrieve a specific task by its ID
- **Parameters**: `id` (string) - Task ID
- **Response**: Task object
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Task not found

**Example Response:**
```json
{
  "id": "task123",
  "employeeId": "employee123",
  "title": "Develop API",
  "description": "Create REST API endpoints",
  "startTime": null,
  "endTime": null
}
```

#### 3. Get Tasks by Employee
- **URL**: `GET /tasks/employee/:employeeId`
- **Description**: Get all tasks assigned to a specific employee
- **Parameters**: `employeeId` (string) - Employee ID
- **Response**: Array of task objects
- **Status Codes**:
  - `200 OK` - Success

#### 4. Create Task
- **URL**: `POST /tasks`
- **Description**: Create a new task and assign it to an employee
- **Required Fields**: `employeeId`, `title`, `description`
- **Response**: Created task object
- **Status Codes**:
  - `201 Created` - Success

**Example Request:**
```json
{
  "employeeId": "employee123",
  "title": "Develop API",
  "description": "Create REST API endpoints for the new feature"
}
```

**Example Response:**
```json
{
  "id": "generated-task-id",
  "employeeId": "employee123",
  "title": "Develop API",
  "description": "Create REST API endpoints for the new feature",
  "startTime": null,
  "endTime": null
}
```

#### 5. Update Task
- **URL**: `PUT /tasks/:id`
- **Description**: Update an existing task's information
- **Parameters**: `id` (string) - Task ID
- **Response**: Updated task object
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Task not found

**Example Request:**
```json
{
  "title": "Develop API - Updated",
  "description": "Create REST API endpoints with additional features"
}
```

#### 6. Start Task
- **URL**: `PATCH /tasks/:id/start`
- **Description**: Start time tracking for a task
- **Parameters**: `id` (string) - Task ID
- **Response**: Task object with start time
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Task not found

**Example Response:**
```json
{
  "message": "Task started",
  "task": {
    "id": "task123",
    "employeeId": "employee123",
    "title": "Develop API",
    "description": "Create REST API endpoints",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": null
  }
}
```

#### 7. Stop Task
- **URL**: `PATCH /tasks/:id/stop`
- **Description**: Stop time tracking for a task
- **Parameters**: `id` (string) - Task ID
- **Response**: Task object with end time
- **Status Codes**:
  - `200 OK` - Success
  - `404 Not Found` - Task not found

**Example Response:**
```json
{
  "message": "Task stopped",
  "task": {
    "id": "task123",
    "employeeId": "employee123",
    "title": "Develop API",
    "description": "Create REST API endpoints",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": "2024-01-15T12:30:00.000Z"
  }
}
```

#### 8. Delete Task
- **URL**: `DELETE /tasks/:id`
- **Description**: Delete a task from the database
- **Parameters**: `id` (string) - Task ID
- **Response**: No content
- **Status Codes**:
  - `204 No Content` - Success

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "message": "Missing required fields: name, email"
}
```

### Not Found Error (404 Not Found)
```json
{
  "message": "Employee not found"
}
```

## Usage Examples

### Using cURL

#### Create an Employee
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@company.com",
    "position": "Software Developer"
  }'
```

#### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "employee123",
    "title": "Develop API",
    "description": "Create REST API endpoints"
  }'
```

#### Start Time Tracking
```bash
curl -X PATCH http://localhost:3000/tasks/task123/start
```

#### Stop Time Tracking
```bash
curl -X PATCH http://localhost:3000/tasks/task123/stop
```

### Using JavaScript/Fetch

#### Get All Employees
```javascript
fetch('http://localhost:3000/employees')
  .then(response => response.json())
  .then(employees => console.log(employees))
  .catch(error => console.error('Error:', error));
```

#### Create Employee
```javascript
fetch('http://localhost:3000/employees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Software Developer'
  })
})
.then(response => response.json())
.then(employee => console.log(employee))
.catch(error => console.error('Error:', error));
```

## Setup and Installation

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure Firebase**: Ensure your Firebase service account key is properly configured
4. **Start the server**: `npm run dev`
5. **Access the API**: The server will run on `http://localhost:3000`

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: Firebase Firestore
- **Development**: Nodemon, ts-node
- **Documentation**: Swagger UI (available at `/api-docs`)

## Notes

- All timestamps are in ISO 8601 format
- Task IDs and Employee IDs are automatically generated by Firebase
- The API uses Firebase Firestore as the database
- Time tracking is handled automatically when starting/stopping tasks
- All endpoints return JSON responses 