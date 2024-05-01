var tl = gsap.timeline();

tl.from("h1", {
    y: -400,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    scale: 2,
})

tl.from("p", {
    opacity: 0,
    scale: 0,
    duration: 0.7,
})

tl.from("button", {
    y: 300,
    opacity: 0,
    duration: 1,
})