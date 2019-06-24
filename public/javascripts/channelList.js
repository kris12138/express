{
    let view = {
        el: '.page-1>.channel-list>ul',
        render(data) {
            for (let i = 0; i < 12; i++) {
                let li = $(`
                    <li>
                        <a href='./channel&id=${data[i].specialid}'>
                            <img src='${data[i].imgurl.replace('{size}/', '')}' alt="">
                            <p> ${data[i].specialname.substr(0, 9) + '...'}</p>
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
            let channels = []
            $.ajax({
                url: 'http://localhost:3000/getChannelList',
                async: false,
                success: function (result) {
                    channels = JSON.parse(result).plist.list.info
                }
            })
            this.model.data.songs = channels
        }
    }
    controller.init(view, model)

}