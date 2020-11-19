const API_KEY = '113ff844bb8e49e4a77f79f2cd39d017'
const BASE_URL = 'https://api.football-data.org/v2/'

const LEAGUE_ID = 2021
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`

const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log('Error: ' + res.status)
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err)
    })
}

function getAllStandings() {
  if ('caches' in window) {
    caches.match(ENDPOINT_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log('Competition Data: ' + data)
          showStanding(data)
        })
      }
    })
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then((data) => {
      showStanding(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function showStanding(data) {
  let standings = ''
  let standingElement = document.getElementById('homeStandings')

  data.standings[0].table.forEach((standing) => {
    standings += `
                <tr data-aos="fade-down" data-aos-delay="300">
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      'https://'
                    )}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `
  })

  standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr data-aos="fade-down" data-aos-delay="300">
                            <th></th>
                            <th>Team Name</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `
}

// get team
function getAllTeams() {
  if ('caches' in window) {
    caches.match(ENDPOINT_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log('Competition Data: ' + data)
          showTeams(data)
        })
      }
    })
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then((data) => {
      getLoaders()
      showTeams(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

let showTeams = (data) => {
  let standings = ''
  let standingElement = document.getElementById('teamFootball')
  data.standings[0].table.forEach((dataTeams) => {
    standings += `
            <div class="col s12 m6 l4 center-align" data-aos="fade-up" data-aos-delay="300" >
            <a href="./teams.html?id=${dataTeams.team.id}">
                <div class="card small" >
                    <div class="card-image" style="height: 200px;">
                        <img src="${dataTeams.team.crestUrl.replace(
                          /^http:\/\//i,
                          'https://'
                        )}" style="width: 130px;  display: block; margin-left: auto; margin-right: auto; margin-top: 6px" alt="teams"/>
                    </div>
                    <div class="card-content" style="height:150px; background-color: #34495e">
                    <br>
                    <div class="team-name" style="color:white; font-weight: bold">${
                      dataTeams.team.name
                    }</div>
                    </div>
                    
                </div>
            </a>
            </div>
            `
  })
  standingElement.innerHTML = standings
}

// get team squad by id

function getSquadTeamById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search)
    var idParam = urlParams.get('id')
    if ('caches' in window) {
      caches.match(`${BASE_URL}teams/${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            console.log('Competition Data: ' + data)
            showSquadById(data)
            resolve(data)
          })
        }
      })
    }

    fetchAPI(`${BASE_URL}teams/${idParam}`)
      .then((data) => {
        console.log(data)
        showSquadById(data)
        resolve(data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

let showSquadById = (data) => {
  data.squad.forEach((squads) => {
    let teamSquadHTML = `
        <div class="col s12 m6 l4" data-aos="fade-up" data-aos-delay="300" >
            <div class="card">
                <div class="card-content" style="height:150px; background-color: #34495e">
                <div style="color:white; font-weight: bold">${squads.name} - ${squads.position} </div>
                <div style="color:white;">${squads.nationality}</div>
                </div>
            </div>
        </div>
    `
    document.getElementById('squad').innerHTML += teamSquadHTML
  })
}

//mengambil seluruh team
function getSavedArticles() {
  getAll().then((teams) => {
    console.log(teams)
    var teamSquadHTML = ''
    teams.forEach((team) => {
      teamSquadHTML = `
            <div class="col s12 m6 center-align">
            <a href="./teams.html?id=${team.id}&saved=true">
                <div class="card small" >
                    <div class="card-image" style="height: 200px;">
                        <img src="${team.crestUrl.replace(
                          /^http:\/\//i,
                          'https://'
                        )}" style="width: 130px;  display: block; margin-left: auto; margin-right: auto; margin-top: 6px" alt="teams"/>
                    </div>
                    <div class="card-content" style="height:150px; background-color: #34495e">
                    <br> 
                    <div class="team-name" style="color:white; font-weight: bold; justfy-content: space-between;">${
                      team.name
                    }</div>
                    <br/>
                    <div class="right-align" onclick="getDeleteTeam(${
                      team.id
                    })"><a class="waves-effect waves-light btn-small" style="background-color: #222831"><i class="material-icons left">delete</i>Delete</a></div>
                    </div>
                </div>
                <br/> <br/>
            </a>
            </div>
        `
      document.getElementById('footballEmpty').style.display = "none";
      document.getElementById('footbalSaved').innerHTML += teamSquadHTML
    })
  })
}

//mengambil data dari database yang ditampilkan dihalaman detail sv
function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search)
  var idParam = urlParams.get('id')
  getById(idParam).then((team) => {
    console.log(team)
    team.squad.forEach((item) => {
      var articleHTML = `
        <div class="card">
            <div class="col s12 m6 l4" data-aos="fade-up" data-aos-delay="300" >
                <div class="card-content" style="height:150px; background-color: #34495e">
                <div style="color:white; font-weight: bold">${item.name} - ${item.position} </div>
                <div style="color:white;">${item.nationality}</div>
                </div>
            </div>
        </div>
        `
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('squad').innerHTML += articleHTML
    })
  })
}

//delete team by id
let getDeleteTeam = (id) => {
  deleteTeamById(id)
  showNotifikasiDelete()
  M.toast({ html: 'Anda berhasil menghapus team!' })
  console.log('klik delete')
  window.location.reload()
}

let showNotifikasiDelete = () => {
  const title = 'Menghapus Team'
  const options = {
    body: 'Anda berhasil menghapus team!',
  }
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options)
    })
  } else {
    console.error('FItur notifikasi tidak diijinkan.')
  }
}


const getLoaders = () => {
  setTimeout(setLoader(), 3000)
}

const setLoader = () => {
  document.getElementById("loaderContent").style.display = "none";
  document.getElementById("teamFootball").style.display = "block";
}
