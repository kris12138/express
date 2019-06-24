{
    let view = {
        el: '.page>.tab',
        render(data) {
            let parent = $('.page>.tab>ul>li')
            for (let i = 0; i < 3; i++) {
                if (parent[i].id === data) {
                    parent[i].style['color'] = 'white'
                    $('.page>.page-1>.page' + (i + 1))[0].className += ' active'
                }
                else {
                    parent[i].style['color'] = 'black'
                    $('.page>.page-1>.page' + (i + 1))[0].className = $('.page>.page-1>.page' + (i + 1))[0].className.replace(' active', '')
                }
            }
        }
    }
    let model = {
        data: {
            activeTab: 'song'
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents() {
            $('.page>.tab>ul>li').click((e) => {
                this.model.data.activeTab = e.target.id
                this.view.render(this.model.data.activeTab)
            })
        }
    }
    controller.init(view, model)
}