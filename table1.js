var nameInput = document.getElementByClassName('name-input');
var reviewInput = document.getElementByClassName('review-input');


function clearReview() {
	nameInput.value = "";
	reviewInput.value = "";
}

function createReview() {
	if(!nameInput.value){
		alert("Empty name!");
		return false;
	}
	if(!reviewInput.value){
		alert("No review!");
		return false;
	}

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
