var infinite = () => {
  $(function () {
    if ($('.listrecent').children.length >= 1) {
      var postURLs;
      var isFetchingPosts = false;
      var shouldFetchPosts = true;
      var postsToLoad = $('.postbox').length;
      var loadNewPostsThreshold = 3000;

      var postLoader = () => {
        if (!shouldFetchPosts || isFetchingPosts) return;

        var bottomScrollPosition = $(window).height() + $(window).scrollTop();
        var documentHeight = $(document).height();

        // If we've scrolled past the loadNewPostsThreshold, fetch posts
        if (documentHeight - loadNewPostsThreshold < bottomScrollPosition) {
          fetchPosts();
        }

        if (postsToLoad < 9) {
          for (var i = postsToLoad; i < 9; i++) {
            fetchPosts();
          }
        }
      };

      var postbox = post => {
        var categoriesFormated = [];
        var categories = post.categories;
        categories.forEach((val, key) => {
          if (key !== 0) {
            categoriesFormated.push(' ' + val);
          } else {
            categoriesFormated.push(val);
          }
        });

        var postHtmlFormated =
          '<div class="col-lg-4 col-md-6 mb-30px card-group postbox">' +
          '<div class="card h-100">' +
          '<div class="maxthumb">' +
          '<a href="' +
          post.url +
          '">' +
          '<img class="img-fluid" src="' +
          post.image +
          '" alt="' +
          post.title +
          '">' +
          '</a>' +
          '</div>' +
          '<div class="card-body">' +
          '<h3 class="card-title"><a class="text-dark" href="' +
          post.url +
          '">' +
          post.title +
          '</a></h3>' +
          '<span class="badge badge-light">' +
          categoriesFormated +
          '</span>' +
          '<p class="card-text">' +
          post.summary +
          '</p>' +
          '</div>' +
          '<div class="card-footer bg-white">' +
          '<div class="wrapfooter">' +
          '<span class="meta-footer-thumb">' +
          '<img class="author-thumb" src="' +
          post.author.avatar +
          '" alt="' +
          post.author.name +
          '">' +
          '</span>' +
          '<span class="author-meta">' +
          '<span class="post-name"><a target="_blank" href="' +
          post.author.web +
          '">' +
          post.author.name +
          '</a></span><br/>' +
          '<span class="post-date">' +
          post.date +
          '</span>' +
          '</span>' +
          '<span class="post-read-more"><a href="' +
          post.url +
          '" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>' +
          '<div class="clearfix"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';

        return postHtmlFormated;
      };

      // Fetch a chunk of posts
      var fetchPosts = () => {
        // Exit if postURLs haven't been loaded
        if (!postURLs) return;

        isFetchingPosts = true;

        // Load as many posts as there were present on the page when it loaded
        // After successfully loading a post, load the next one
        var loadedPosts = 0;
        var postCount = $('.postbox').children().length;
        var callback = () => {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;

          if (postIndex > postURLs.length - 1) {
            disableFetching();
            return;
          }

          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };

        fetchPostWithIndex(postCount + loadedPosts, callback);
      };

      var fetchPostWithIndex = (index, callback) => {
        var postURL = postURLs[index];
        var post = postbox(postURL);

        $(post).appendTo('.listrecent');
        callback();
      };

      var disableFetching = () => {
        shouldFetchPosts = false;
        isFetchingPosts = false;
        $('.infinite-spinner').fadeOut();
      };

      // Load the JSON file containing all URLs
      $.getJSON('/json/home.json', data => {
        postURLs = data['posts'];

        // If there aren't any more posts available to load than already visible, disable fetching
        if (postURLs.length <= postsToLoad) {
          disableFetching();
        } else {
          postLoader();
        }
      });

      // If there's no spinner, it's not a page where posts should be fetched
      if ($('.infinite-spinner').length < 1) {
        shouldFetchPosts = false;
      }

      // Are we close to the end of the page? If we are, load more posts
      $(window).scroll(e => {
        postLoader();
      });
    }
  });
};

export default infinite();
