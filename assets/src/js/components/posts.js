var posts = () => {
  $(function () {
    if ($('.latest-posts').length >= 1) {
      var postbox = (post) => {
        var categoriesFormated = []
        var categories = post.categories
        categories.forEach((val, key) => {
          if (key !== 0) {
            categoriesFormated.push(' ' + val)
          } else {
            categoriesFormated.push(val)
          }
        })

        var postHtmlFormated = '<div class="col-lg-4 col-md-6 mb-30px card-group postbox">' +
          '<div class="card h-100">' +
            '<div class="maxthumb">' +
            '<a href="' + post.url + '">' +
              '<img class="img-fluid" src="' + post.image + '" alt="' + post.title + '">' +
            '</a>' +
            '</div>' +
            '<div class="card-body">' +
              '<h3 class="card-title"><a class="text-dark" href="' + post.url + '">' + post.title + '</a></h3>' +
              '<span class="badge badge-light">' + categoriesFormated + '</span>' +
              '<p class="card-text">' + post.summary + '</p>' +
            '</div>' +
            '<div class="card-footer bg-white">' +
              '<div class="wrapfooter">' +
                '<span class="meta-footer-thumb">' +
                  '<img class="author-thumb" src="' + post.author.avatar + '" alt="' + post.author.name + '">' +
                '</span>' +
                '<span class="author-meta">' +
                  '<span class="post-name"><a target="_blank" href="' + post.author.web + '">' + post.author.name + '</a></span><br/>' +
                  '<span class="post-date">' + post.date + '</span>' +
                '</span>' +
                '<span class="post-read-more"><a href="' + post.url + '" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>' +
                 '<div class="clearfix"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'

        return postHtmlFormated
      }

      // Fetch a chunk of posts
      var fetchPosts = (post) => {
        // Exit if postURLs haven't been loaded
        if ($('.postbox').length <= 2) {
          $('.latest-posts').append(postbox(post))
        } else {
          $('.infinite-spinner').remove()
        }
      }

      // Load the JSON file containing all URLs
      $.getJSON('https://blog.nicolasjouanno.com/api/posts.json', (data) => {
        var posts = data['posts']

        posts.forEach((post) => {
          fetchPosts(post)
        })
      })
    }
  })
}

export default posts()
