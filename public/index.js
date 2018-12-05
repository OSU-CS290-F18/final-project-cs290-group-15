var reviewName = document.querySelector('.name-input');
var review = document.querySelector('.review-input');
var modal = document.querySelector('.reviewModal');

function getProductFromURL() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  if (pathParts[1] === "products") {
    return pathParts[2];
  } else {
    return null;
  }
}

function handleReviewSubmitClick() {
    
	if(!reviewName.value === ""){
		alert("Empty name!");
		return false;
	}
	if(!review.value === ""){
		alert("No review!");
		return false;
	}
    else {
//       console.log("All fields filled");
        createReview();
        
        var postRequest = new XMLHttpRequest();
        var requestURL = '/products/' + getProductFromURL()  + '/addReview';
        postRequest.open('POST', requestURL);

        var requestBody = JSON.stringify({
            reviewName: reviewName,
            review: review
        });
        
        postRequest.addEventListener('load', function(event) {
            if (event.target.status === 200) {
                var reviewTemplate = Handlebars.templates.Reviews;
                var newreviewHTML = reviewTemplate({
                    reviewName: reviewName,
                    review: review
                });
                
                var reviewContainer = document.querySelector('.review-container');
                reviewContainer.insertAdjacentHTML('beforeend', newreviewHTML);
            } else {
                alert("Error storing data" + event.target.response);
            }
        });
        
        postRequest.setRequestHeader('Content-Type', 'application/json');
        postRequest.send(requestBody);
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