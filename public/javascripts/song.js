{
    let view = {
        el: '.wapper',
        render(data) {
            $('.wapper>.nav>.content>.name').text(data.song_name)
            $('.wapper>.nav>.content>.singer').text(data.author_name)
            $('.wapper>.play>audio').attr("src", data.play_url);
            $('.wapper>.banner>img').attr("src", data.img);
        }
    }
    let model = {
        data: {
            sing: []
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvents()
        },
        getSong() {
            let search = window.location.href
            let hash = search.split('=')[1]
            let song = {}
            $.ajax({
                url: 'http://localhost:3000/getSong/'+hash,
                async: false,
                success: function (result) {
                  
                    song = JSON.parse(result).data
                }
            })
            return song
        },
        bindEvents() {
            this.model.data.sing = this.getSong()
            this.view.render(this.model.data.sing)
            $('.wapper>.play>.pause').on('click', (e) => {
                if ($(e.currentTarget).find('svg>use').attr('xlink:href') === '#icon-play1') {
                    $(e.currentTarget).find('svg>use').attr('xlink:href', '#icon-pause')
                    $('audio')[0].play()
                    $('.banner').css('animation-play-state', ' running')
                } else {
                    $(e.currentTarget).find('svg>use').attr('xlink:href', '#icon-play1')
                    $('audio')[0].pause()
                    $('.banner').css('animation-play-state', ' paused')
                }
            })
            $('.voice').mouseup(function (e) {
                var obj = document.getElementsByClassName("voice-num")[0]
                var left = obj.offsetLeft;
                while (obj = obj.offsetParent) {
                    left += obj.offsetLeft;
                }
                var obj = document.getElementsByClassName("voice-num")[0]
                $('.voice>.voice-num>.voice>.dot').css("left", e.pageX - left + 'px')
                $('.voice>.voice-num>.voice').css("width", e.pageX - left + 'px')
                $('audio')[0].volume = (e.pageX - left) / obj.clientWidth
            });

            $('.banner').click(function (e) {
                $('.banner').removeClass("active")
                $('.lyric').addClass("active")
            });

            $('.lyric').click(function (e) {
                $('.banner').addClass("active")
                $('.lyric').removeClass("active")
            });
            //   设置初始歌词
            let lyric = this.model.data.sing.lyrics
            lyric = lyric.split('\n')
            let lyric_time = []
            for (let key in lyric) {
                var timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;
                var time = lyric[key].match(timeReg);
                if (!time) continue;
                time = lyric[key].split(']')[0].replace('[', '').split(':')
                time = parseInt(time[0]) * 60 + parseFloat(time[1])
                content = lyric[key].split(']')[1]
                if (content) {
                    if (content[0] != '[') {
                        lyric_time.push([time, content])
                    }
                }
            }
            for (let i = 0; i < 10; i++) {
                var p = ` <p>${lyric_time[i][1]}</p>`
                $(".lyric").append(p)
            }
            // 设置播放进度 
            $('.process').mouseup(function (e) {
                var obj = document.getElementsByClassName("process")[0]
                var width = obj.clientWidth
                var left = obj.offsetLeft;
                $('audio')[0].currentTime = (e.pageX - left) * $('audio')[0].duration / width
            });
            //   设置播放歌词
            $('audio').on('play', (e) => {
                var obj = document.getElementsByClassName("process")[0]
                console.log('开始播放');
                idTime = setInterval((e) => {
                    $('.process>.process-num').css("width", obj.clientWidth / ($('audio')[0].duration) * ($('audio')[0].currentTime) + 'px')
                    $('.process>.process-dot').css("left", obj.clientWidth / ($('audio')[0].duration) * ($('audio')[0].currentTime) + 'px')
                    for (let i = 1; i < lyric_time.length - 1; i++) {
                        if (((lyric_time[i][0]) < ($('audio')[0].currentTime)) & ((lyric_time[i + 1][0]) > ($('audio')[0].currentTime))) {
                            $(".lyric>p").remove()
                            for (let j = 0; j < 10; j++) {
                                if (lyric_time[i - 1 + j]) {
                                    var p = ` <p>${lyric_time[i - 1 + j][1]}</p>`
                                    $(".lyric").append(p)
                                }
                            }
                            break
                        }
                    }
                }, 300)
            })
            $('audio').bind('ended', function () {
                console.log('结束');
                window.clearInterval(idTime)
                $('.play>.pause>svg>use').attr('xlink:href', '#icon-play1')
            })
            $('audio').bind('pause', function () {
                console.log('暂停');
                window.clearInterval(idTime)
                $('.play>.pause>svg>use').attr('xlink:href', '#icon-play1')
                $('audio')[0].pause()
                $('.banner').css('animation-play-state', ' paused')
            })
        }

    }
    controller.init(view, model)

}


