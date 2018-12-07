$(document).ready(function () {
    /* global moment */

    // inquiryContainer holds all of our posts
    var inquiryContainer = $(".inquiry-container");
    var postInquiryySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get inquiry posts for the profile
    // Looks for a query param in the url for profile_id
    var url = window.location.search;
    var profileId;
    if (url.indexOf("?profile_id=") !== -1) {
        profileId = url.split("=")[1];
        getPosts(profileId);
    }
    // If there's no profileId we just get all posts as usual
    else {
        getPosts();
    }


    // This function grabs posts from the database and updates the view
    function getPosts(profile) {
        profileId = profile || "";
        if (profileId) {
            profileId = "/?profile_id=" + profileId;
        }
        $.get("/api/posts" + profileId, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(profile);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .then(function () {
                getPosts(postInquirySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside the inquiryContainer
    function initializeRows() {
        inquiryContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        inquiryContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostTitle = $("<h2>");
        var newInquiryPostDate = $("<small>");
        var newPostInquiry = $("<h5>");
        newPostInquiry.text("Written by: " + post.Inquiry.name);
        newPostInquiry.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newInquiryPostDate.text(formattedDate);
        newPostTitle.append(newInquiryPostDate);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostInquiry);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Inquiry #" + id;
        }
        inquiryContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        inquiryContainer.append(messageH2);
    }

});
