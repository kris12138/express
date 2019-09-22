{
    let view = {
        el: '.wapper>.new-song-list>ul',
        render(data) {
            let lists = data.list.list.info
            $('.new-song-list>.name').text(data.info.list.specialname)
            for (let i = 0; i < 10; i++) {
                let li = $(`
                <li>
                    <a href='./song&id=${lists[i].hash}'>
                        <h3>${lists[i].filename.split(' - ')[1]}</h3>
                        <svg class="icon" aria-hidden="true" id="hot">
                            <use xlink:href="#icon-hot"></use>
                        </svg>
                        <span>${lists[i].filename.split(' - ')[0]}</span>
                        <svg class="icon" aria-hidden="true" id="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>
                `)
                $(this.el).append(li)
            }
        }
    }
    let model = {
        data: {
            songs: []
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvents()
            this.view.render(this.model.data.songs)
        },
        bindEvents() {
            let search = window.location.href
            let hash = search.split('=')[1]
            let songs = {}
            $.ajax({
                url: '/getChannel/' + hash,
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    songs = data
                }
            })
            this.model.data.songs = songs
        }
    }
    controller.init(view, model)
}