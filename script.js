class Shop {
    constructor() {
        let that = this;
        //dropdown menu
        this.dropDownMenu = document.querySelector('#dropDownMenu');
        this.btnCatalog = document.querySelector('.catalog');
        this.arrow = document.querySelector('.arrow-img').children[0];

        //slider
        this.currentSlide = 1;
        this.currentTrans = null;
        this.slideArr = document.getElementsByClassName('slide');
        this.mainSlide = document.querySelector('.main-slide').children[0];
        this.mainSlideWrapper = document.querySelector('.main-slide');
        this.slides = document.querySelector('.slides');
        this.prevBtn = document.querySelector('.prevSlide');
        this.nextBtn = document.querySelector('.nextSlide');

        //tabs product
        this.tabsProdItems = document.getElementsByClassName('tabContent');
        this.btnProdItems = document.getElementsByClassName('tab');

        //tabs specifications
        this.tabsSpecItems = document.getElementsByClassName('info-box');
        this.btnsSpecItems = document.getElementsByClassName('tab1');

        //call functions
        this.dropMenu();
        this.changeSlide();
        this.tabsProduct();
        this.tabsSpec();
        this.activationBtnsSlide();
        this.clickOnBigPic();
    }

    dropMenu() {
        const that = this;
        this.arrow.style.transition = '0.3s ease-in-out';
        document.body.onclick = function (e) {
            if (!(e.target.classList.contains('catalog') ||
                e.target.classList.contains('burger') ||
                e.target.classList.contains('arrowImg') ||
                e.target.classList.contains('burgerStick') ||
                e.target.innerHTML == 'каталог тваров')) {
                that.dropDownMenu.style.display = 'none';
                that.btnCatalog.classList.remove('open');
                that.btnCatalog.classList.add('close');
                that.arrow.style.transform = 'rotate(0deg)';
            }



        }
        this.btnCatalog.onclick = function () {
            if (that.btnCatalog.classList.contains('close')) {
                that.dropDownMenu.style.display = 'block';
                that.btnCatalog.classList.remove('close');
                that.btnCatalog.classList.add('open');
                that.arrow.style.transform = 'rotate(180deg)';
            } else {
                that.dropDownMenu.style.display = 'none';
                that.btnCatalog.classList.remove('open');
                that.btnCatalog.classList.add('close');
                that.arrow.style.transform = 'rotate(0deg)';
            }
        }

    }

    changeSlide() {
        let that = this;
        for (let el of this.slideArr) {
            el.onclick = function (e) {
                that.mainSlideWrapper.innerHTML = '';
                let mainImg = document.createElement('img');
                if (e.target.className == 'slide') {
                    mainImg.src = e.target.children[0].src;
                } else if (e.target.className == 'slideImg') {
                    mainImg.src = e.target.src;
                }
                that.currentSlide = that.slideArr[el];
                that.mainSlideWrapper.appendChild(mainImg);
                that.mainSlide = mainImg;
            }
        }

        this.mainSlide.onclick = function (e) {
            that.mainSlide = that.slideArr[0];

        }
    }

    activationBtnsSlide() {
        this.prevBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        if (this.slideArr.length > 3) {
            this.prevBtn.style.display = 'block';
            this.nextBtn.style.display = 'block';
            this.nextSlide();
            this.prevSlide();
        }
    }

    nextSlide() {
        let that = this;
        this.nextBtn.onclick = function () {
            console.log(that.slideArr.length);
            if (that.currentSlide >= (that.slideArr.length - 2)) {
                return;
            } else {
                that.slides.style.transition = '1s';

                that.currentSlide += 1;
                if (!(document.body.clientWidth >= 576)) {
                    that.slides.style.transform = `translateX(${that.currentTrans -= 50}%)`;
                } else {
                    that.slides.style.transform = `translateX(${that.currentTrans -= 204}px)`;
                }

            }
        }


    }
    clickOnBigPic() {
        let that = this;
        this.mainSlideWrapper.onclick = function (e) {
            that.mainSlideWrapper.innerHTML = '';
            let mainImg = document.createElement('img');
            mainImg.src = that.slideArr[that.currentSlide + 1].children[0].src;
            that.mainSlideWrapper.appendChild(mainImg);
            that.mainSlide = mainImg;
        }
    }

    prevSlide() {
        let that = this;
        this.prevBtn.onclick = function () {
            if (that.currentSlide <= 1) {
                return;
            } else {
                that.slides.style.transition = '1s';
                that.currentSlide -= 1;
                console.log(that.currentSlide);

                if (!(document.body.clientWidth >= 576)) {
                    that.slides.style.transform = `translateX(${that.currentTrans += 50}%)`;
                } else {

                    that.slides.style.transform = `translateX(${that.currentTrans += 204}px)`;
                }
            }
        }

    }

    hideAllTabs() {
        this.tabsProdItems[0].style.display = 'block';
        for (let el of this.tabsProdItems) {
            el.style.display = 'none';
        }
        for (let el of this.btnProdItems) {
            el.classList.remove('buy-active')
        }
    }

    hideAllTabsSpec() {
        this.tabsSpecItems[0].style.display = 'block';
        for (let el of this.tabsSpecItems) {
            el.style.display = 'none';
        }
        for (let el of this.btnsSpecItems) {
            el.classList.remove('tab1-active')
        }
    }

    tabsProduct() {
        const that = this;
        this.hideAllTabs();
        this.tabsProdItems[0].style.display = 'block';
        this.btnProdItems[0].classList.add('buy-active');
        for (let el of this.btnProdItems) {
            el.onclick = function (e) {
                if (e.target.classList.contains('delivery')) {
                    that.hideAllTabs();
                    that.tabsProdItems[0].style.display = 'block';
                    e.target.classList.add('buy-active');
                }
                if (e.target.classList.contains('pay')) {
                    that.hideAllTabs();
                    that.tabsProdItems[1].style.display = 'block';
                    e.target.classList.add('buy-active');
                }
                if (e.target.classList.contains('warranty')) {
                    that.hideAllTabs();
                    that.tabsProdItems[2].style.display = 'block';
                    e.target.classList.add('buy-active');
                }
                if (e.target.classList.contains('trade')) {
                    that.hideAllTabs();
                    that.tabsProdItems[3].style.display = 'block';
                    e.target.classList.add('buy-active');
                }
            }
        }
    }

    tabsSpec() {
        const that = this;
        this.hideAllTabsSpec();
        this.tabsSpecItems[0].style.display = 'block';
        this.btnsSpecItems[0].classList.add('tab1-active');
        for (let el of this.btnsSpecItems) {
            el.onclick = function (e) {
                if (e.target.classList.contains('params')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[0].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
                if (e.target.classList.contains('description')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[1].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
                if (e.target.classList.contains('review')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[2].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
                if (e.target.classList.contains('revise')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[3].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
                if (e.target.classList.contains('instruction')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[4].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
                if (e.target.classList.contains('quastion')) {
                    that.hideAllTabsSpec();
                    that.tabsSpecItems[5].style.display = 'block';
                    e.target.classList.add('tab1-active');
                }
            }
        }
    }
}

window.onload = function () {
    const shop = new Shop();
}



