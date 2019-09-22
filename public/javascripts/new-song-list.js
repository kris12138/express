{
    let view = {
        el: '.page-1>.new-song-list>ul',
        render(data) {
            for (let i = 0; i < 15; i++) {
                let li = $(`
                    <li>
                        <a href='./song&id=${data[i].hash}'>
                            <h3>${data[i].filename.split(' - ')[1]}</h3>
                        </a>
                        <svg class="icon" aria-hidden="true" id="hot">
                            <use xlink:href="#icon-hot"></use>
                        </svg>
                        <svg class="icon" aria-hidden="true" id="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                        <span>${data[i].filename.split(' - ')[0]}</span>
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
            let songs = []
            $.ajax({
                url: '/getTop',
                async: false,
                success: function (result) {
                    songs = result.songs.list
                }
            })
            this.model.data.songs = songs
        }
    }
    controller.init(view, model)

}



