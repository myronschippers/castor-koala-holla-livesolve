console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $('#js-addButton').on('click', function () {
    console.log('in addButton on click');
    // let readyForTransfer = $('#js-readyForTransferIn').val();

    // if (readyForTransfer === 'N') {
    //   readyForTransfer = false;
    // } else {
    //   readyForTransfer = true;
    // }

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#js-nameIn').val(),
      age: $('#js-ageIn').val(),
      gender: $('#js-genderIn').val(),
      readyForTransfer:
        $('#js-readyForTransferIn').val() === 'N' ? false : true,
      notes: $('#js-notesIn').val(),
    };
    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });

  // event listener
  $('#js-viewKoalas').on('click', '.js-btn-ready', handleClickReady);
}

function handleClickReady() {
  const id = $(this).data('id');

  updateKoalaReadyTransfer(id);
}

//
// API / SERVER CALLS
// ------------------------------

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  })
    .then(function (response) {
      // render to the DOM
      render(response);
    }) // successful response
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong retrieving koalas.');
    }); // failure from server
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala,
  })
    .then(function (response) {
      clearFormFields();
      // get new list of koalas
      getKoalas();
    }) // successful response
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong save your koala.');
    });
}

function updateKoalaReadyTransfer(koalaId) {
  console.log(`UPDATE Koala ${koalaId} - to ready`);
  // AJAX PUT
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    // data: {}
  })
    .then((response) => {
      getKoalas();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong readying koala for transfer.');
    });
}

//
// DOM INTERACTION
// ------------------------------

function clearFormFields() {
  $('#js-nameIn').val('');
  $('#js-ageIn').val('');
  $('#js-genderIn').val('');
  $('#js-readyForTransferIn').val('');
  $('#js-notesIn').val('');
}

function render(listOfKoalas) {
  console.log(listOfKoalas);
  $('#js-viewKoalas').empty();
  for (let koala of listOfKoalas) {
    // check boolean and make Y or N
    let readyYN = koala.ready_to_transfer;
    let readyTransferBtn = '';

    // check transfer status for button
    if (koala.ready_to_transfer === false) {
      readyTransferBtn = `<button class="js-btn-ready" data-id="${koala.id}">
        Ready for Transfer
      </button>`;
    }

    if (readyYN) {
      readyYN = 'Y';
    } else {
      readyYN = 'N';
    }

    $('#js-viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${readyYN}</td>
        <td>${koala.notes}</td>
        <td>${readyTransferBtn}</td>
      </tr>
    `);
  }
}
