document.addEventListener("DOMContentLoaded", function() {
  (function() {
    "use strict";
    // init the sidenav instance
    let sideNavEl = document.querySelectorAll(".sidenav");
    let instanceOfSideNav = M.Sidenav.init(sideNavEl, {});
    // smooth scrolling to the target when #pulseBtn a clicked
    document
      .querySelector("#pulseBtn a")
      .addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
          // the default value: block: "start", inline: "nearest"
          block: "start"
        });
      });
      // smooth scrolling to the top when #oneStepToTop is clicked
      document
      .querySelector("#oneStepToTop a")
      .addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
          // the default value: block: "start", inline: "nearest"
          // block: "start"
        });
      });
    // smooth scrolling to the target when ul#slide-out li a clicked
    // add active class to clicked a link
    // remove it from the other a links
    let sidenavLink = document.querySelectorAll("ul#slide-out li a");
    sidenavLink.forEach(achor => {
      achor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        sidenavLink.forEach(a => {
          a.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
    // hide or display the #oneStepToTop div based on the current scrollPosition.
    let oneStepToTop = document.getElementById("oneStepToTop");
    let aboutSecTopPos = document.getElementById("about").offsetTop;
    let scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
    oneStepToTop.style.display = (scrollPosition <= aboutSecTopPos) ? "none" : "block";

    // skill bar animation
    let everAnimatedOnce = false;
    const skillAnimate = function() {
      let skills = document.querySelectorAll(".skills");
      skills.forEach(skill => {
        let skillStyle = window.getComputedStyle(skill);
        let widthOfCss = skillStyle.getPropertyValue('width');
        let keyframes = [];
        keyframes[0] = {};
        keyframes[0].width = 0;
        keyframes[1] = {};
        keyframes[1].width = widthOfCss;
        let timeOptions = {
          // timing options
          easing: "ease-in-out",
          duration: 2000,
          iterations: 1
        };
        skill.animate(keyframes, timeOptions);
      })
    };

    if (
      scrollPosition >= (document.getElementById("skills").offsetTop + document.getElementById("skills").clientHeight * 0.2) &&
      !everAnimatedOnce
    ) {
      skillAnimate();
      everAnimatedOnce = true;
    }

    // dynamically set active class to the ul#slide-out li a
    // when the corresponding section shown in the viewport
    window.onscroll = function() {
      let sections = document.querySelectorAll(".section:not(:nth-child(1))");
      let sectionsId = [];
      let sectionsInfo = {};
      sections.forEach(el => {
        sectionsId.push(el.id);
        sectionsInfo[el.id] = {};
        sectionsInfo[el.id].secTopPos = el.offsetTop - el.clientHeight * 0.5;
        sectionsInfo[el.id].secBottomPos = el.offsetTop + el.clientHeight * 0.5;
      });
      let scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (let key in sectionsInfo) {
        if (
          scrollPosition >= sectionsInfo[key].secTopPos &&
          scrollPosition <= sectionsInfo[key].secBottomPos
        ) {
          let currActive = document.querySelector(".active");
          if (currActive != null) {
            currActive.classList.remove("active");
          }
          document
            .querySelector("a[href*=" + key + "]")
            .classList.add("active");
        }
      }
      // when scrolling into the intro section area, remove the active class from sidenav
      if (scrollPosition <= sectionsInfo["about"].secTopPos * 0.5) {
        let currActive = document.querySelector(".active");
        if (currActive != null) {
          currActive.classList.remove("active");
        }
      }
      // hide or display the #oneStepToTop div based on the current scrollPosition.
      oneStepToTop.style.display = (scrollPosition <= aboutSecTopPos) ? "none" : "block";

      // animate the skill bar when scrolling into the skills section area.
      if (
        scrollPosition >= (sectionsInfo["skills"].secTopPos) && !everAnimatedOnce
      ) {
        skillAnimate();
        everAnimatedOnce = true;
      }

    };




  })();
});
