
// Delete button
$('.btn-delete').on('click', function(){
	var itemId = $(this).closest('.quote-item').data('item-id');
	deleteQuote(itemId);
});

function deleteQuote(currentId) {
	fetch('quotes', {
		method: 'delete',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'itemId': currentId.toString()
		})
	}).then(res => {
		if (res.ok) return res.json()
	}).then(data => {
		console.log(data)
		window.location.reload(true)
	})
}

// Delete all button
$('#deleteAll').on('click', function(){
	if (confirm("It will delete all records, are you sure!") == true) {
		deleteAllQuote();
	}
});

function deleteAllQuote(currentId) {
	fetch('quotesDeleteAll', {
		method: 'delete',
		headers: {'Content-Type': 'application/json'}
	}).then(res => {
		if (res.ok) return res.json()
	}).then(data => {
		console.log(data)
		window.location.reload(true)
	})
}


// Update button
$('.btn-update').on('click', function(){
	// var item = $(this).parent('.quote-item');
	var itemId = $(this).closest('.quote-item');
	updateQuote(itemId);	
});

function updateQuote(currentItem) {
	// Send PUT Request here

	var itemId = currentItem.data('item-id').toString();
	var textName = currentItem.find('.text-name').val();
	var textQuote = currentItem.find('.text-quote').val();

	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': textName,
			'quote': textQuote,
			'itemId': itemId
		})
	}).then(res => {
		if (res.ok) return res.json()
	}).then(data => {
		console.log(data)
		window.location.reload(true)
	})
}

// var update = document.getElementById('update');

// function updateQoute(currentItem) {
// 	// Send PUT Request here

// 	var itemId = currentItem.data('qoute-id');

// 	fetch('quotes', {
// 		method: 'put',
// 		headers: {'Content-Type': 'application/json'},
// 		body: JSON.stringify({
// 			'name': 'Darth Vader',
// 			'quote': 'I find your lack of faith disturbing.'
// 		})
// 	}).then(res => {
// 		if (res.ok) return res.json()
// 	}).then(data => {
//   		console.log(data)
//   		window.location.reload(true)
// 	})
// }


// var del = document.getElementById('delete')

// del.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'deleteAll',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(res => {
//     if (res.ok) return res.json()
//   }).then(data => {
//     console.log(data)
//     window.location.reload()
//   })
// })