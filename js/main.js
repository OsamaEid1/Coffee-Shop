// INITIALIZE AOS(Scrolling Library)
AOS.init();

// Back To Top Button
let topBtn = document.querySelector(".back-to-top");
let show = document.querySelector(".show");
window.onscroll = () => {
   this.scrollY >= 200
      ? topBtn.classList.add("show")
      : topBtn.classList.remove("show");
};

// Testimonials Slider
let testContainer = document.querySelector(".testi-container");
let testimonials = document.querySelectorAll(".testi-container .box");
let indicators = document.querySelector(".testi-indicators");
//detect Screen
let smallScreen = window.matchMedia("(max-width: 767px)").matches;
let mediumScreen = window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches;

//return updated testimonials
let getTestimonials = () => document.querySelectorAll(".testi-container .box");

//create indicators bullets based on no. of boxes
function createIndicators() {
   if (smallScreen) {
      //Remove testimonials boxes that up to the half to be not too long
      for (let i = testimonials.length; i > Math.trunc(testimonials.length / 2); i--) {
         testimonials[i - 1].remove();
      }
      //Create indicators
      for (let i = 0; i < Math.trunc(testimonials.length / 2); i++) {
         let li = document.createElement("li");
         indicators.appendChild(li);
      }
      //Add active class to the first indictor
      document.querySelector(".testi-indicators li").className = "active";
   } else if (mediumScreen) {
      //Remove last slide to make it 8 testimonials to make it suitable for show 2 testimonial in the screen
      testimonials[testimonials.length - 1].remove();
      //Create indicators
      for (let i = 0; i < (testimonials.length - 1) / 2; i++) {
         let li = document.createElement("li");
         indicators.appendChild(li);
      }
      //Add active class to the first indictor
      document.querySelector(".testi-indicators li").className = "active";
   } else {
      //Create indicators
      for (let i = 0; i < Math.ceil(testimonials.length / 3); i++) {
         let li = document.createElement("li");
         indicators.appendChild(li);
      }
      //Add active class to the first indictor
      document.querySelector(".testi-indicators li").className = "active";
   }
   //Update testimonials
   testimonials = getTestimonials();
}
createIndicators();

//start Slider
let interval;
startSlider = () => {
   interval = setInterval(() => {
      moveToNextTestimonials();
   }, 3000);
};
startSlider();

let firstClone;
let secondClone;
let thirdClone;
let xPrevLastClone;
let prevLastClone;
let lastClone;
let indx = 0; //for tracking first box of the testimonials that in the view
let swap = 0; //for tracking the no. of testi-container swaps

//clone tha first and last testimonials that appears in the screen view based on device-width and Start the slider
if (smallScreen) {
   firstClone = testimonials[0].cloneNode(true);
   lastClone = testimonials[testimonials.length - 1].cloneNode(true);

   firstClone.id = "first-cloned-node";
   lastClone.id = "last-cloned-node";

   testContainer.appendChild(firstClone);
   testContainer.prepend(lastClone);

   //get updated testimonials
   testimonials = getTestimonials();
   //make the lastCloned slide outside of the view
   testContainer.style.transform = "translateX(-100%)";
   indx++;
} else if (mediumScreen) {
   firstClone = testimonials[0].cloneNode(true);
   secondClone = testimonials[1].cloneNode(true);
   prevLastClone = testimonials[testimonials.length - 2].cloneNode(true);
   lastClone = testimonials[testimonials.length - 1].cloneNode(true);

   firstClone.id = "first-cloned-node";
   prevLastClone.id = "prev-last-cloned-node";

   testContainer.appendChild(firstClone);
   testContainer.appendChild(secondClone);
   testContainer.prepend(lastClone);
   testContainer.prepend(prevLastClone);

   //get Updated testimonials
   testimonials = getTestimonials();
   //Make the (lastCloned & prevLastCloned) testimonials outside of the view
   testContainer.style.transform = "translateX(-100%)";

   swap++;
   indx += 2;
} else {
   firstClone = testimonials[0].cloneNode(true);
   secondClone = testimonials[1].cloneNode(true);
   thirdClone = testimonials[2].cloneNode(true);
   xPrevLastClone = testimonials[testimonials.length - 3].cloneNode(true);
   prevLastClone = testimonials[testimonials.length - 2].cloneNode(true);
   lastClone = testimonials[testimonials.length - 1].cloneNode(true);

   firstClone.id = "first-cloned-node";
   xPrevLastClone.id = "xprev-last-cloned-node";

   testContainer.appendChild(firstClone);
   testContainer.appendChild(secondClone);
   testContainer.appendChild(thirdClone);
   testContainer.prepend(lastClone);
   testContainer.prepend(prevLastClone);
   testContainer.prepend(xPrevLastClone);

   //get Updated testimonials
   testimonials = getTestimonials();
   //Make the (lastCloned & prevLastCloned) testimonials outside of the view
   testContainer.style.transform = "translateX(-100%)";
   swap++;
   indx += 3;
}

// Move To the next testimonial
moveToNextTestimonials = () => {
   clearInterval(interval);
   if (smallScreen) {
      if (indx >= testimonials.length - 1) return;
      else {
         //Move to the next
         indx++;
         testContainer.style.transition ="all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * indx}%)`;
         //Move active class to the next indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (indx == 5)
            //Active the first indicator because we reached to the end(first cloned nodes)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${indx})`).classList.add("active");
      }
   } else if (mediumScreen) {
      if (indx >= testimonials.length - 2) return;
      else {
         //Move to the next
         swap++;
         indx += 2;
         testContainer.style.transition = "all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
         //Move active class to the next indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (swap == 5) 
            //Active the first indicator because we reached to the end(first cloned nodes)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else 
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${swap})`).classList.add("active");
      }
   } else {
      if (indx >= testimonials.length - 3) return;
      else {
         //Move to the next
         swap++;
         indx += 3;
         testContainer.style.transition = "all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
         //Move active class to the next indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (swap >= 4)
            //Active the first indicator because we reached to the end(first cloned nodes)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${swap})`).classList.add("active");
      }
   }
   startSlider();
};

// Move To the Previous testimonial(s)
moveToPrevTestimonials = () => {
   if (indx == 0) return;
   else {
      if (smallScreen) {
         //Move to the Previous
         indx--;

         //Move to the next
         testContainer.style.transition ="all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * indx}%)`;
         //Move active class to the next indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (indx == 5)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else if (indx == 0)
            document.querySelector("#testimonials .testi-indicators li:last-child").classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${indx})`).classList.add("active");
      } else if (mediumScreen) {
         //Move to the next
         swap--;
         indx -= 2;

         testContainer.style.transition = "all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
         //Move active class to the previous indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (swap == 5)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else if (swap == 0)
            document.querySelector(`#testimonials .testi-indicators li:last-child`).classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${swap})`).classList.add("active");
      } else {
         //Move to the Previous
         swap--;
         indx -= 3;

         //Move to the next
         testContainer.style.transition ="all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
         //Move active class to the next indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         if (swap == 5)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else if (swap == 0)
            document.querySelector("#testimonials .testi-indicators li:last-child").classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${swap})`).classList.add("active");

         //Move active class to the Previous indicator
         document.querySelector("#testimonials .testi-indicators .active").classList.remove("active");
         // if (indx == 0) {
         //    testContainer.style.transition = "all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
         //    testContainer.style.transform = `translateX(0%)`;
         //    //Active the last indicator because we reached to the beginning(x previous last cloned nodes)
         //    document.querySelector(`#testimonials .testi-indicators li:last-child`).classList.add("active");
         //    return;
         // } else {
            testContainer.style.transition = "all 1s cubic-bezier(0.39, 0.58, 0.57, 1) 0s";
            testContainer.style.transform = `translateX(${-100 * swap}%)`;
         // }
         if (swap == 4)
            //Active the first indicator because we reached to the end(first cloned nodes)
            document.querySelector(`#testimonials .testi-indicators li`).classList.add("active");
         else if(indx == 0) 
            document.querySelector("#testimonials .testi-indicators li:last-child").classList.add("active");
         else
            document.querySelector(`#testimonials .testi-indicators li:nth-child(${swap})`).classList.add("active");
      }
   }
   startSlider();
};

/* Check if the current indx of the box is the (first-cloned or last-cloned) testimonial 
To return to the (beginning or ending) of the testimonials */
testContainer.addEventListener("transitionend", () => {
   if (smallScreen) {
      //Reached to the end of testimonials
      if (testimonials[indx].id == firstClone.id) {
         console.log("es");   
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials arrangement
         indx = 1;
         testContainer.style.transform = `translateX(${-100 * indx}%)`;
      } else if (testimonials[indx].id == lastClone.id) { //jumped to the beginning of testimonials
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials arrangement
         indx = testimonials.length - 2;
         testContainer.style.transform = `translateX(${-100 * indx}%)`;
      }
   } else if (mediumScreen) {
      //Reached to the end of testimonials
      if (testimonials[indx].id == firstClone.id) {
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials order
         indx = 2;
         swap = 1;
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
      }
      //jump to the beginning of testimonials
      else if (testimonials[indx].id == prevLastClone.id) {
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials order
         indx = testimonials.length - 4;
         swap = 4;
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
      }
   } else {
      //Reached to the end of testimonials
      if (testimonials[indx].id == firstClone.id) {
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials order
         indx = 3;
         swap = 1;
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
      }
      //Reached to the beginning of testimonials
      else if (testimonials[indx].id == xPrevLastClone.id) {
         //To make the movement of the reset invisible
         testContainer.style.transition = "none";
         //Reset testimonials order
         indx = testimonials.length - 6;
         swap = 3;
         testContainer.style.transform = `translateX(${-100 * swap}%)`;
      }
   }
});

// Move to Next OR Previous Testimonials when Click On Arrow Buttons 
let nextBtn = document.querySelector(".testi-foot .next-testi-btn");
let prevBtn = document.querySelector(".testi-foot .prev-testi-btn");

nextBtn.addEventListener("click", () => moveToNextTestimonials());
prevBtn.addEventListener("click", () => {
   clearInterval(interval);
   moveToPrevTestimonials();
});

// Stop Slider when mouse hover on the testimonials container
testContainer.addEventListener("mouseenter", () => clearInterval(interval));
// Run function when mouse Leave the testimonials container
testContainer.addEventListener("mouseleave", startSlider);


//Handle Reservation Inputs
let inputs = document.querySelectorAll("#book form input[type='text'], #book form input[type='email']");
let spansInputs = document.querySelectorAll("#book form input[type='text']+span,#book form input[type='email']+span");
//Add & Remove Active class for span when clicking on the input
inputs.forEach(input => {
   input.addEventListener("focus", () => {
      input.nextElementSibling.classList.add("active-input");
   });
   input.addEventListener("blur", () => {
      if (input.value.length <= 0) {
         input.nextElementSibling.classList.remove("active-input");
      }
   });
});
//Add & Remove Active class for span when clicking on the span
spansInputs.forEach((span) => {
   span.addEventListener("click", () => {
      span.previousElementSibling.focus();
   });
});