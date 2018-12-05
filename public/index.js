function handleReviewSubmitClick() {
    var reviewName = document.getElementById('name-input').value.trim();
    var review = document.getElementById('review-input').value.trim();
    
	if(!nameInput.value){
		alert("Empty name!");
		return false;
	}
	if(!reviewInput.value){
		alert("No review!");
		return false;
	}
    else {
        var postRequest = new XMLHttpRequest();
        var requestURL = '/products/' '/addReview';
    }
    
}


function clearReview() {
	nameInput.value = "";
	reviewInput.value = "";
}

function createReview() {

	var parentSection = document.getElementByClassName('review-container');

	var newReview = document.createElement('div');
	newReview.classList.add('reviews');
	parentSection.append(newReview);

	var newReviewHeader = document.createElement('div');
	newReviewHeader.classList.add('review-header');
	newReview.append(newReviewHeader);

	var name = document.createElement('p');
	name.textContent = nameInput.value;
	newReviewHeader.append(name);
	
	var newReviewBody = document.createElement('div');
	newReviewBody.classList.add('review-body');
	newReview.append(newReviewBody);

	var review = document.createElement('p');
	review.textContent = reviewInput.value;
	newReviewBody.append(review);

	clearReview();
}

var reviewButton = document.getElementByClassName('review-button');
reviewButton.addEventListener('click', clearReview);


window.addEventListener('DOMContentLoaded', function() {
    var reviewButton = document.getElementById('review-button');
    reviewButton.addEventListener('click', createReview);
    
    var submitReviewButton = document.getElementById('review-submit-button');
    submitReviewButton.addEventListener('click', handleReviewSubmitClick);
})