{
    let view = {
        el: '.page>.tab',
        render() {
            let parent = $('.page>.tab>ul>li>a')
            for (let i = 0; i < 3; i++) {
                parent[i].style['color'] = 'black'
            }
            let href = window.location.pathname
            console.log(window)
            if (href === '/recommend_channel_list') {
                parent[1].style['color'] = 'white'
                $('.page>.page-1>.page2')[0].className += ' active'
            }
            else if (href === '/') {
                parent[0].style['color'] = 'white'
                $('.page>.page-1>.page1')[0].className += ' active'
            }
            else if (href === '/search') {
                parent[2].style['color'] = 'white'
                $('.page>.page-1>.page3')[0].className += ' active'
            }
        }
    }
    let model = {
        data: {
            activeTab: ''
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
        }
    }
    controller.init(view, model)
}