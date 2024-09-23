const foreheadSlider = new Swiper('#forehead-slider', {
    loop: true,
    navigation: {
        nextEl: '.forehead-button-next',
        prevEl: '.forehead-button-prev',
    },
});
const eyeSlider = new Swiper('#eye-slider', {
    loop: true,
    navigation: {
        nextEl: '.eye-button-next',
        prevEl: '.eye-button-prev',
    },
});
const mouthSlider = new Swiper('#mouth-slider', {
    loop: true,
    navigation: {
        nextEl: '.mouth-button-next',
        prevEl: '.mouth-button-prev',
    },
});
let faceSegments = [
    {
        "faceNet": "faceNetTop",
        "faceColor": "faceColorGroup53Top",
    },
    {
        "faceNet": "faceNetMiddle",
        "faceColor": "faceColorGroup53Middle",
    },
    {
        "faceNet": "faceNetBottom",
        "faceColor": "faceColorGroup53Bottom",
    },
]
function getLeftDot(el) {
    let center = el.innerWidth() / 2;
    let left = el.offset().left + center;
    return left;
}
function getTopDot(el) {
    let center = el.innerHeight() / 2;
    let top = el.offset().top + center;
    return top;
}
function isInViewport(el) {
    let elementTop = el.offset().top + 100;
    let elementBottom = elementTop + el.outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
}
$(".presentation-head__item-box").each(function (index) {
    let section = $(this);
    let startDot = $(".dot_start").eq(index);
    let endDot = $(".dot_end").eq(index);
    let svgEl = $(`<svg id="line_${index}" style="width: 100%; height: 100%; pointer-events: none; position: absolute; top: 0; left: 0;"><line stroke-width="0.5" stroke="#000"/><circle class="dot_line_1_${index}" fill="white" stroke="black" stroke-width="0.5" r="3.25" /><circle class="dot_line_2_${index}" fill="white" stroke="black" stroke-width="0.5" r="3.25" /></svg>`);
    let lineEl = svgEl.find("line");
    svgEl.appendTo(".presentation-head");
    let faceSegmentNet = $("#" + faceSegments[index].faceNet);
    let faceSegmentColor = $("#" + faceSegments[index].faceColor);

    function setStyles() {
        let parentContainer = $('.presentation-head');
        let parentContainerOffsetTop = parentContainer.offset().top;
        svgEl.attr("viewBox", `0 0 ${parentContainer.width()} ${parentContainer.height()}`);
        let dotLine1 = $(".dot_line_1_" + index);
        let dotLine2 = $(".dot_line_2_" + index);
        lineEl.attr("x1", getLeftDot(startDot));
        lineEl.attr("y1", getTopDot(startDot) - parentContainerOffsetTop);
        lineEl.attr("x2", getLeftDot(endDot));
        lineEl.attr("y2", getTopDot(endDot) - parentContainerOffsetTop);
        dotLine1.attr("cx", getLeftDot(startDot));
        dotLine1.attr("cy", getTopDot(startDot) - parentContainerOffsetTop);
        dotLine2.attr("cx", getLeftDot(endDot));
        dotLine2.attr("cy", getTopDot(endDot) - parentContainerOffsetTop);
    }

    function activateSection() {
        if (isInViewport(section)) {
            section.addClass("active");
            setStyles();
            lineEl.attr("stroke", "#000");
            faceSegmentNet.css("opacity", "1");
            faceSegmentColor.css("opacity", "1");
        } else {
            section.removeClass("active");
            setStyles();
            lineEl.attr("stroke", "#C6C6C6");
            faceSegmentNet.css("opacity", "0");
            faceSegmentColor.css("opacity", "0");
        }
    }

    setStyles();
    activateSection();

    $(window).scroll(function() {
        activateSection();
    });

    $(window).resize(function() {
        activateSection();
    });
});

