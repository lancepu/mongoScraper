$(document).ready(function() {
  $(".savePost").on("click", async function() {
    const postId = $(this)
      .parent(".cardBtnGroup")
      .attr("postId");
    console.log(postId);
    try {
      await $.ajax({
        method: "PUT",
        url: `/save/${postId}`
      });
      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
  });

  function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attached a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    var articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again. This will reload the entire list of articles
        initPage();
      }
    });
  }
});
