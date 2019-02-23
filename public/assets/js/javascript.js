$(document).ready(function() {
  $(".toggleSave").on("click", async function() {
    const postId = $(this)
      .parent(".cardBtnGroup")
      .attr("postId");
    try {
      await $.ajax({
        method: "PUT",
        url: `/save/${postId}`
      });
      window.location = "/saved";
    } catch (ex) {
      console.log(ex);
    }
  });

  $(".commentBtn").on("click", async function() {
    const postId = $(this)
      .parent(".cardBtnGroup")
      .attr("postId");
    window.location = `/${postId}`;
  });

  $(".submitNewComment").on("click", async function() {
    const postId = $(this).attr("postId");
    try {
      await $.ajax({
        method: "POST",
        url: `/${postId}`,
        data: {
          title: $("#commentTitle").val(),
          body: $("#commentBody").val()
        }
      });
      window.location = `/${postId}`;
    } catch (ex) {
      console.log(ex);
    }
  });

  $(".deleteComment").on("click", async function() {
    const postId = $(this).attr("postId");
    try {
      await $.ajax({
        method: "DELETE",
        url: `/comments/${postId}`
      });
      window.location = `/saved`;
    } catch (ex) {
      console.log(ex);
    }
  });
});
