import marquee from 'vanilla-marquee'
import Splide from '@splidejs/splide'
import Header from './modules/header'

window.addEventListener('DOMContentLoaded', () => {
    //header
    new Header()

    //init course marquee;
    let marquees = [...document.querySelectorAll('.marquee')],
        courseCarousel = document.querySelector('#upcomingCourseSlider')

    if (marquees.length) {
        marquees.forEach((item) => {
            new marquee(item, {
                duplicated: true,
                speed: 100,
                recalcResize: true,
                startVisible: true,
            })
        })
    }

    if (courseCarousel) {
        new Splide('#upcomingCourseSlider', {
            perPage: 4,
            type: 'loop',
            gap: 43,
            pagination: false,
            breakpoints: {
                1600: {
                    perPage: 3,
                    gap: 20,
                },
                992: {
                    perPage: 2,
                    gap: 16,
                    padding: {
                        right: 80,
                    },
                },
                660: {
                    perPage: 1,
                    padding: {
                        right: 30,
                    },
                },
            },
        }).mount()
    }

    const heroGallery = document.querySelector('#hero-carousel'),
        heroThumbnail = document.querySelector('#thumbnail-slider')

    // course details hero carousel
    if (heroGallery && heroThumbnail) {
        var main = new Splide('#hero-carousel', {
            perPage: 1,
            type: 'loop',
            gap: 20,
            arrows: false,
            pagination: false,
        })

        var thumbnails = new Splide('#thumbnail-slider', {
            perPage: 4,
            type: 'loop',
            gap: 20,
            arrows: false,
            pagination: false,
            isNavigation: true,
        })

        main.sync(thumbnails)
        main.mount()
        thumbnails.mount()
    }

    // course details tab
    document.querySelectorAll('.tab__nav-link').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault()

            let currentElement = event.target,
                hash = currentElement.hash

            //remove class from all tab link;
            document.querySelectorAll('.tab__nav-link').forEach((item) => {
                item.classList.remove('tab__nav-link--active')
            })

            //add class to current element
            currentElement.classList.add('tab__nav-link--active')

            // if has exist then show tab body element
            if (hash) {
                document.querySelectorAll('.tab-content').forEach((item) => {
                    item.style.display = 'none'
                })
                document.querySelector(hash).style.display = 'block'
            }
        })
    })

    //log in register modal switcher
    let allElement = []
    document.querySelectorAll('.js-showhide').forEach((element) => {
        let _hash = element.hash
        allElement.push(_hash)

        element.addEventListener('click', (event) => {
            event.preventDefault()

            let currentElement = event.target,
                hash = currentElement.hash

            ;``
            // if has exist then show tab body element
            if (hash) {
                allElement.forEach((item) => {
                    document.querySelector(item).style.display = 'none'
                })
                document.querySelector(hash).style.display = 'block'
                window.scrollTo(0, 0)
            }
        })
    })

    //course dropdown button
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-download-button')) {
            event.preventDefault()

            if (event.target.nextElementSibling.classList.contains('show')) {
                event.target.nextElementSibling.classList.remove('show')
            } else {
                document.querySelectorAll('.tab-content__dropdown').forEach((dropdown) => {
                    dropdown.classList.remove('show')
                    event.target.nextElementSibling.classList.add('show')
                })
            }
        }
    })

    //form validation log & register
    function formValidation($formId) {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        }

        if (document.querySelector($formId)) {
            document.querySelector($formId).addEventListener('submit', (event) => {
                event.preventDefault()
                let form = event.target,
                    inputEmail = form.querySelector('[type="email"]'),
                    inputs = form.querySelectorAll('input:not([type="email"])')

                //input email validation
                if (!validateEmail(inputEmail.value)) {
                    inputEmail.parentElement.classList.add('error')
                } else {
                    inputEmail.parentElement.classList.remove('error')
                }

                //return error if input empty
                inputs.forEach((input) => {
                    if (input.value.length == 0) {
                        input.parentElement.classList.add('error')
                    } else {
                        input.parentElement.classList.remove('error')
                    }
                })
            })
        }
    }

    formValidation('#login-form')
    formValidation('#register-form')

    const copyButton = document.querySelector('.tracking__input--copy')
    const copyUrl = document.querySelector('.js-copy-url')

    if (copyButton) {
        copyButton.addEventListener('click', copyToClipboard)
    }

    if (copyUrl) {
        copyUrl.addEventListener('click', copyToClipboard)
    }

    async function copyToClipboard(event) {
        event.preventDefault()

        let input = document.querySelector('.tracking__input--copy')
        // Select the text field
        input.select()
        input.setSelectionRange(0, 99999) // For mobile devices

        console.log(input.value)

        // Copy the text inside the text field
        await navigator.clipboard.writeText(input.value)

        // Alert the copied text
        alert('Campaign URL has been copied to your clipboard.')
    }
})
