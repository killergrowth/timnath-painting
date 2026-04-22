(function ($) {
    "use strict";
    
  /**********GSAP AMINATION START************/

  // Split Text
  function bwsplit_text() {
    setTimeout(function () {
      var splitTextElements = $(".sec-title__title, .sec-title__tagline, .footer-widget__title");
      if (splitTextElements.length === 0) return;
      gsap.registerPlugin(SplitText);
      splitTextElements.each(function (index, element) {
        var splitElement = new SplitText(element, {
          type: "chars, words", // "chars, words, lines"
        });

        gsap.set(element, {
          perspective: 400
        });

        if ($(element).hasClass("bw-split-in-fade")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            ease: "Back.easeOut"
          });
        }
        if ($(element).hasClass("bw-split-in-right")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            x: "20",
            ease: "Back.easeOut"
          });
        }
        if ($(element).hasClass("bw-split-in-left")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            x: "-20",
            ease: "Back.easeOut"
          });
        }
        if ($(element).hasClass("bw-split-in-up")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            y: "20",
            ease: "circ.out"
          });
        }
        if ($(element).hasClass("bw-split-in-down")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            y: "-20",
            ease: "circ.out"
          });
        }
        if ($(element).hasClass("bw-split-in-rotate")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            rotateX: "50deg",
            ease: "circ.out"
          });
        }
        if ($(element).hasClass("bw-split-in-scale")) {
          gsap.set(splitElement.chars, {
            opacity: 0,
            rotateX: "50deg",
            ease: "circ.out"
          });
        }
        element.anim = gsap.to(splitElement.chars, {
          scrollTrigger: {
            trigger: element,
            toggleActions: "restart pause resume reverse",
            start: "top 90%"
          },
          x: "0",
          y: "0",
          rotateX: "0",
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.02
        });
      });
    }, 200);
  }

  //IMAGE ANIMATION
  gsap.registerPlugin(ScrollTrigger);
  let revealContainers = document.querySelectorAll(".real-image");
  revealContainers.forEach((container) => {
    let image = container.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "restart none none reset",
      },
    });

    tl.set(container, {
      autoAlpha: 1
    });
    tl.from(container, 1.5, {
      xPercent: -100,
      ease: Power2.out,
    });
    tl.from(image, 1.5, {
      xPercent: 100,
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out,
    });
  });



    $(window).on("load", function () {
        bwsplit_text();
    });
})(jQuery);