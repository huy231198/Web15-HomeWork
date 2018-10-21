$(document).ready(function () {
    $('#search').on('submit', function (event) {
        event.preventDefault();
        const keyword = $("#keyword").val();
        getItem(keyword);
        $('#result-list').empty();
    });
});

function getItem(keyword) {
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: "GET",
        success: function (response) {
            let listItem = response.items.map(function (videoItem) {
                return `
                            <a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoItem.id.videoId}?autoplay=true" target="_blank">
                                  <img src="${videoItem.snippet.thumbnails.high.url}" alt="">
                                   <div class="video_info">
                                   <p class="description">${videoItem.snippet.description}</p>
                                      <span>View >></span>
                                    </div>
                              </a>
                          `;
            });
            $("#result-list").append(listItem);
        }
    });
}

//Em chiu khong biet lam phan con lai