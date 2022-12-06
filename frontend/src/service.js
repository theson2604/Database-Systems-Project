export async function getCustomer() {
    return fetch('/db/GetCustomer', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then((response) => response.json())
    
}
export async function getCustomerByName(fullname) {
 
  return fetch('/db/GetCustomerByName', {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({"fullname":fullname},)
  })
  .then((response) => response.json())
  
}

export async function getRoomBooking(id) {
 
  return fetch('/db/GetRoomBooking', {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({"id":id},)
  })
  .then((response) => response.json())
  
}

export async function getCustomerStat(branch_id, year) {
    // let branch_id = $('#branch option:selected').val()
    // let year = $('#year option:selected').val()

    return fetch('/db/GetCustomerStat', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
    body: JSON.stringify({"branch_id": parseInt(branch_id), "year": parseInt(year)}),
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    'Content-Type': 'application/json'
    },
    })
    .then((response) => response.json())
    
}

// LOGIN HANDLE
export async function loginUser(credentials) {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      credentials: 'same-origin'
    })
      .then(data => data.json())
   }

  export async function logout() {
  return fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    
    credentials: 'same-origin'
  })
    .then(data => data.json())
  }

export async function getSupplyType() {
  return fetch('/db/GetSupplyType', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.

    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    })
  .then((response) => response.json())
    
}

export async function saveRoomTypeRecord(data) {
  return fetch('/db/AddRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  })
    .then(data => data.json())
 }