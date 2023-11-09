

console.log( 'js' );
getKoalas();

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  }).then((response) => {
    console.log('GET/ koalas', response.data);
    renderKoalaList(response.data)
  }).catch((error) => {
    console.log('error with GET', error);
  })

  
} // end getKoalas


// Post function with axios call to server to send request for koalas
function addKoala(event) {
  event.preventDefault()
  let koalaName = document.getElementById("nameIn").value;
  let koalaAge = document.getElementById("ageIn").value;
  let koalaGender = document.getElementById("genderIn").value;
  let koalaTransferStatus = document.getElementById("readyForTransferIn").value;
  let koalaNotes = document.getElementById("notesIn").value;

axios({
  method: 'POST',
  url: '/koalas',
  data: 
  {
    koalaName: koalaName,
    koalaAge: koalaAge,
    koalaGender: koalaGender,
    koalaTransferStatus: koalaTransferStatus,
    koalaNotes: koalaNotes
  }

}).then(function(response) {
    getKoalas()
}).catch(function(error){
  console.log('error in post', error);
})
};

// Put function with axios call to update the server for koalas


// Render function to append the koala table
function renderKoalaList(koalas){
  const viewKoalas = document.getElementById('viewKoalas');
  viewKoalas.innerHTML = '';
for (let koala of koalas){
   viewKoalas.innerHTML += 
   `
   <tr data-koalaid = "${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td><button onclick="updateKoalaTransferStatus(event)">${koala.readyToTransfer}</button></td>
      <td>${koala.notes}</td>
    </tr>


   `
}
}

// Delete function with axios call to delete koala
function deleteKoala(){}

function updateKoalaTransferStatus(event){
  let koalaID = event.target.closest("tr").getAttribute("data-koalaid");
  console.log(koalaID);
  axios({
    method: 'PUT',
    url: `koalas/${koalaID}`
  }).then((response)=>{
    console.log("koalaByID");
    getKoalas();
  }).catch((error)=>{
    console.log("error in put",error)
  })
}



