var reviewName = document.querySelector('.name-input');
var review = document.querySelector('.review-input');
var modal = document.querySelector('.reviewModal');


function handleReviewSubmitClick() {
    //var reviewName = document.querySelector('.name-input').value.trim();
    //var review = document.querySelector('.review-input').value.trim();
    
	if(!reviewName.value){
		alert("Empty name!");
		return false;
	}
	if(!review.value){
		alert("No review!");
		return false;
	}
    else {
       console.log("All fields filled");
       createReview();
       return true;
        //var postRequest = new XMLHttpRequest();
        //var requestURL = '/products/' '/addReview';
    }
    
}

function xButtonClick() {
   modal.classList.add("hidden");
}

function makeReview() {
        modal.classList.remove("hidden");
	reviewName.value = "";
	review.value = "";
	console.log("The inputs were cleared");
}

function createReview() {
        
	var parentSection = document.querySelector('.review-container');

	var newReview = document.createElement('div');
	newReview.classList.add('reviews');
	parentSection.append(newReview);

	var newReviewHeader = document.createElement('div');
	newReviewHeader.classList.add('review-header');
	newReview.append(newReviewHeader);

	var name = document.createElement('p');
	name.textContent = reviewName.value;
	newReviewHeader.append(name);
	
	var newReviewBody = document.createElement('div');
	newReviewBody.classList.add('review-body');
	newReview.append(newReviewBody);

	var newReviewContent = document.createElement('p');
	newReviewContent.textContent = review.value;
	console.log("review content is:", review.value);
	newReviewBody.append(newReviewContent);
        
        modal.classList.add("hidden");	
	//clearReview();
}

var reviewButton = document.querySelector('.review-button');
reviewButton.addEventListener('click', makeReview);
var submitButton = document.querySelector('.review-submit-button');
submitButton.addEventListener('click', handleReviewSubmitClick);
var xButton = document.querySelector('.modal-x-button');
xButton.addEventListener('click', xButtonClick);


/*window.addEventListener('DOMContentLoaded', function() {
    var reviewButton = document.querySelector('.review-button');
    reviewButton.addEventListener('click', createReview);
    
    var submitReviewButton = document.querySelector('.review-submit-button');
    submitReviewButton.addEventListener('click', handleReviewSubmitClick);
})*/
