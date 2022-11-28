export function getCustomer() {
    fetch('/db/GetCustomer', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then((response) => response.json())
    .then((data) => {return data})
}

export async function getCustomerStat(branch_id, year) {
    // let branch_id = $('#branch option:selected').val()
    // let year = $('#year option:selected').val()

    return fetch('http://localhost:3000/db/GetCustomerStat', {
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
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      credentials: 'same-origin'
    })
      .then(data => data.json())
   }