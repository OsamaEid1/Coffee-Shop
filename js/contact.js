// INITIALIZE AOS(Scrolling Library)
AOS.init();

//Start Back To Top Button
let topBtn = document.querySelector(".back-to-top");
let show = document.querySelector(".show");
window.onscroll = () => {
    this.scrollY >= 200
        ? topBtn.classList.add("show")
        : topBtn.classList.remove("show");
};

//Handle Inputs
// let inputs = document.querySelectorAll("#book form .input-group");
let firstInputsGroup = document.querySelectorAll(".content form input:not(.subj)");
let lastInputsGroup = document.querySelectorAll(".content form .subj, .content form textarea");
let firstSpansGroup= document.querySelectorAll(".content form input:not(.subj) + span");
let lastSpansGroup= document.querySelectorAll(".content form .subj + span, .content form textarea + span");

//Add & Remove Active class for span when clicking on the input
firstInputsGroup.forEach(input => {
    input.addEventListener("focus", () => {
        input.nextElementSibling.classList.add("active-input");
    });
    input.addEventListener("blur", () => {
        if (input.value.length <= 0) {
            input.nextElementSibling.classList.remove("active-input");
        }
    });
});
// Add & Remove Active class for span when clicking on the span
firstSpansGroup.forEach((span) => {
    span.addEventListener("click", () => {
        span.previousElementSibling.focus();
    });
});

//Add & Remove Active class for span when clicking on the input
lastInputsGroup.forEach((input) => {
    input.addEventListener("focus", () => {
        if (input.tagName == "TEXTAREA") 
            document.querySelector(".textarea-span").classList.add("active-lg-input");
        else 
            input.nextElementSibling.classList.add("active-lg-input");
    });
    input.addEventListener("blur", () => {
        if (input.value.length <= 0) {
            if (input.tagName == "TEXTAREA") 
                document.querySelector(".textarea-span").classList.remove("active-lg-input");
            else 
                input.nextElementSibling.classList.remove("active-lg-input");
        }
    });
});
// Add & Remove Active class for span when clicking on the span
lastSpansGroup.forEach((span) => {
    span.addEventListener("click", () => span.previousElementSibling.focus());
});