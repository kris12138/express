{
    let view = {
        el: '.page>.page-1>.search',
        renderSearchContent(data) {
            $('.page>.page-1>.search>h2>input')[0].value = data
        },
        renderHotSearch(data) {
            for (let i = 0; i < data.length; i++) {
                let li = $(` <li> ${data[i].k}</li>`)
                $('.page>.page-1>.search>.wapper>.hotSearch').append(li)
            }
        },
        renderHistorySearch(data) {
            $('.page>.page-1>.search>.wapper>.history>li').remove()
            for (let i = 0; i < data.length; i++) {
                let li = $(` <li> ${data[i]}</li>`)
                $('.page>.page-1>.search>.wapper>.history').append(li)
            }
        },
        renderSearchResult(data) {
            $('.page>.page-1>.search>.searchResult').children('li').remove()
            for (let i = 0; i < data.length; i++) {
                let li = $(`
                    <li>
                    <a href='./song&id=${data[i].hash}'>
                    <h3>${data[i].filename.split(' - ')[1]}</h3>
                    <svg class="icon" aria-hidden="true" id="hot">
                            <use xlink:href="#icon-hot"></use>
                    </svg>
                    <span>${data[i].filename.split(' - ')[0]}</span>
                        <svg class="icon" aria-hidden="true" id="play">
                                <use xlink:href="#icon-play"></use>
                            </svg></a>
                </li>
                    `)
                $('.page>.page-1>.search>.searchResult').append(li)
            }
        }
    }
    let model = {
        data: {
            hotSearch: [],
            historySearch: [],
            searchContent: '',
            searchResult: []
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvents()
            this.view.renderSearchResult(this.model.data.searchResult)
            this.view.renderSearchContent(this.model.data.searchContent)
            this.view.renderHistorySearch(this.model.data.historySearch)
        },
        getStorage() {
            let storage = window.localStorage
            if (storage.getItem("history")) {
                let history = storage.getItem("history").split(',')
                return history
            }
            return []

        },
        setStorage(content) {
            let storage = window.localStorage
            let history = this.getStorage()
            if (history.length > 10) {
                storage.setItem("history", content + ',' + history.slice(0, 10).join().replace(content + ',', ''))
            }
            else if (history.length === 0) {
                storage.setItem("history", content)
            }
            else {
                storage.setItem("history", content + ',' + history.join().replace(content + ',', ''))
            }
        },
        bindEvents() {
            let hotSearch = []
            $.getJSON({
                url: 'http://localhost:3000/getHotSearch/',
                async: false,
                success: function (data) {
                    hotSearch = data.data.hotkey
                }
            })
            this.model.data.historySearch = this.getStorage()
            this.model.data.hotSearch = hotSearch
            this.view.renderHotSearch(this.model.data.hotSearch)
            this.view.renderHistorySearch(this.model.data.historySearch)

            $('.page>.page-1>.search>.wapper>ul>li').click((e) => {
                let content = e.target.innerText
                this.setStorage(content)
                this.model.data.searchContent = content
                this.model.data.historySearch = this.getStorage()
                let songs = []
                $.ajax({
                    url: 'http://localhost:3000/search/' + content,
                    async: false,
                    success: function (data) {
                        songs = JSON.parse(data).data.info
                    }
                })
                this.model.data.searchResult = songs
                this.view.renderSearchResult(this.model.data.searchResult)
                this.view.renderSearchContent(this.model.data.searchContent)
                this.view.renderHistorySearch(this.model.data.historySearch)
            })

            $('.page>.page-1>.search>h2>span').click((e) => {
                let content = e.currentTarget.previousElementSibling.value
                this.setStorage(content)
                this.model.data.historySearch = this.getStorage()
                this.model.data.searchContent = content
                let songs = []
                $.ajax({
                    url: 'http://localhost:3000/getSearch/' + content,
                    async: false,
                    success: function (data) {
                        songs = JSON.parse(data).data.info
                    }
                })
                this.model.data.searchResult = songs

            })
        }
    }
    controller.init(view, model)
}


